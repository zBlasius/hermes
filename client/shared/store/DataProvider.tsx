import React, { createContext, useContext } from "react";
import { StatementLocalRepository } from "../../app/repositories/Statement/StatementLocalRepository";

interface DataContextType {
  incomeAmount: string;
  outcomeAmount: string;
  calculateTotalAmount: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [incomeAmount, setIncomeAmount] = React.useState<string>("0");
  const [outcomeAmount, setOutcomeAmount] = React.useState<string>("0");
  const statementRepo = React.useMemo(() => new StatementLocalRepository(), []);

  function calculateTotalAmount() {
    statementRepo.getAll().then((statements) => {
      if (statements) {
        const totalOutcome = statements.reduce((total, statement) => {
          const statementDate = new Date(statement.date);
          const currentDate = new Date();
          const isCurrentMonth =
            statementDate.getMonth() === currentDate.getMonth() &&
            statementDate.getFullYear() === currentDate.getFullYear();
          if (statement.type === "outcome" && isCurrentMonth) {
            return total + statement.amount;
          }
          return total;
        }, 0);

        const totalIncome = statements.reduce((total, statement) => {
          const statementDate = new Date(statement.date);
          const currentDate = new Date();
          const isCurrentMonth =
            statementDate.getMonth() === currentDate.getMonth() &&
            statementDate.getFullYear() === currentDate.getFullYear();
          if (statement.type === "income" && isCurrentMonth) {
            return total + statement.amount;
          }
          return total;
        }, 0);
        setIncomeAmount(totalIncome.toString());
        setOutcomeAmount(totalOutcome.toString());
      }
    });
  }

  return (
    <DataContext.Provider
      value={{ incomeAmount, outcomeAmount, calculateTotalAmount }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData deve ser usado dentro do DataProvider");
  }

  return context;
}
