import React, { useEffect, useState } from "react";
import ReportsView from "./View";
import { StatementLocalRepository } from "@/app/repositories/Statement/StatementLocalRepository";
import { useTabStore } from "@/shared/store/AuthProvider";

interface IStatement {
  _id: string;
  amount: number;
  date: string;
  description: string;
  type: "income" | "outcome";
}

type ordanationOptions = "month" | "year" | "customPeriod";

interface IReportsData {
  value: number;
  dataPointText: string;
  label: string;
}

interface ITypeReportsData {
  income: IReportsData[] | [];
  outcome: IReportsData[] | [];
}

export default function Container() {
  const { tabSelected } = useTabStore();
  const [statements, setStatements] = useState<IStatement[] | null>(null);
  const [reportsData, setReportsData] = useState<ITypeReportsData | null>(null);
  const statementRepo = new StatementLocalRepository();

  useEffect(() => {
    if (tabSelected == "reports") {
      statementRepo.getAll().then((ret) => {
        console.log("Statements fetched:", ret);
        if (ret) {
          const formatedDate = customPeriod(ret);
          setReportsData(formatedDate);
          setStatements(ret);
        }
      });
    }
  }, [tabSelected]);

  function groupByMonth(data: any[]) {
    const jsonTable: { [key: string]: number } = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month < 10 ? "0" + month : month}`;
      jsonTable[key] = (jsonTable[key] || 0) + item.amount;
    });
    return jsonTable;
  }

  function customPeriod(localStatement?: IStatement[]): ITypeReportsData {
    // this standard function will show the last two months and the next 5 months of current date
    const currentDate = new Date();
    const incomesJsonTable: { [key: string]: number } = {}; //! Make it generic if possible, to be used in outcomes and other data in the future
    const outcomesJsonTable: { [key: string]: number } = {};

    for (let i = -2; i <= 5; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1,
      );
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month < 10 ? "0" + month : month}`;
      incomesJsonTable[key] = 0; // Initialize with zero or fetch actual data if needed
      outcomesJsonTable[key] = 0; // Initialize with zero or fetch actual data if needed
    }
    const _statements = localStatement || statements;
    const allIncomes = _statements?.filter(
      (item: any) => item.type === "income",
    );
    const allOutcomes = _statements?.filter(
      (item: any) => item.type === "outcome",
    );
    const groupedIncomes = groupByMonth(allIncomes || []);
    const groupedOutcomes = groupByMonth(allOutcomes || []);

    Object.keys(groupedIncomes).forEach((key) => {
      if (incomesJsonTable[key] !== undefined) {
        incomesJsonTable[key] = groupedIncomes[key];
      }
    });

    console.log("groupedOutcomes", groupedOutcomes, "outcomesJsonTable", outcomesJsonTable);
    Object.keys(groupedOutcomes).forEach((key) => {
      if (outcomesJsonTable[key] !== undefined) {
        outcomesJsonTable[key] = groupedOutcomes[key];
      }
    });

    const incomesFormattedData: IReportsData[] = Object.entries(
      incomesJsonTable,
    ).map(([label, value]) => ({
      label: formatDataLabel(label),
      value,
      dataPointText: `R$${value}`,
    }));

    const outcomesFormattedData: IReportsData[] = Object.entries(
      outcomesJsonTable,
    ).map(([label, value]) => ({
      label: formatDataLabel(label),
      value,
      dataPointText: `R$${value}`,
    }));

    console.log("Formatted data:", { income: incomesFormattedData, outcome: outcomesFormattedData });
    return { income: incomesFormattedData, outcome: outcomesFormattedData };
  }

  function formatDataLabel(label: string) {
    const [year, month] = label.split("-");
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[monthIndex]} ${year.substring(2)}`;
  }

  function ordenateBy(type: ordanationOptions) {
    const ordenationActions = {
      month: () => {},
      year: () => {},
      customPeriod: () => customPeriod(),
    };

    const action = ordenationActions[type];
    if (action) {
      const result = action();
      console.log("ordenateBy result", result);
      setReportsData(result ?? null);
    }
  }

  return <ReportsView reportsData={reportsData} ordenateBy={ordenateBy} />;
}
