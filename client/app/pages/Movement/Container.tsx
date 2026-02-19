import React, { useState } from "react";
import { Text, View } from "react-native";
import MovementView from "./View";
import { StatementLocalRepository } from "../../repositories/Statement/StatementLocalRepository";
import { JobsLocalRepository } from "@/app/repositories/Jobs/JobsLocalRepository";
import ModalContainer from "@/shared/components/Modal/Container";
import { Input } from "@/shared/components/Input/Container";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useToast } from "@/shared/store/ToastProvider";

export default function Container() {
  const statementRepo = new StatementLocalRepository();
  const jobsRepo = new JobsLocalRepository();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeStatement, setTypeStatement] = useState<"income" | "outcome">(
    "income",
  );
  const [incomeAmount, setIncomeAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const { showRegularToast } = useToast();

  const TYPE_DESCRIPTION = {
    income: { header: "Income Statement", modalTitle: "Income" },
    outcome: { header: "Outcome Statement", modalTitle: "Outcome" },
  };

  function handleOpenModal() {
    setIsModalVisible(!isModalVisible);
  }

  function openIncomeModal() {
    handleOpenModal();
    setTypeStatement("income");
  }

  function openOutcomeModal() {
    handleOpenModal();
    setTypeStatement("outcome");
  }

  // function getTotalOutcome() {
  //   return statementRepo.getAll().then((statements) => {
  //     if (statements) {
  //       const totalOutcome = statements.reduce((total, statement) => {
  //         const statementDate = new Date(statement.date);
  //         const currentDate = new Date();
  //         const isCurrentMonth =
  //           statementDate.getMonth() === currentDate.getMonth() &&
  //           statementDate.getFullYear() === currentDate.getFullYear();
  //         if (statement.type === "outcome" && isCurrentMonth) {
  //           return total + statement.amount;
  //         }
  //         return total;
  //       }, 0);
  //       return totalOutcome;
  //     }
  //     return 0;
  //   });
  // }

  // function getTotalIncome() {
  //   return statementRepo.getAll().then((statements) => {
  //     if (statements) {
  //       const totalIncome = statements.reduce((total, statement) => {
  //         const statementDate = new Date(statement.date);
  //         const currentDate = new Date();
  //         const isCurrentMonth =
  //           statementDate.getMonth() === currentDate.getMonth() &&
  //           statementDate.getFullYear() === currentDate.getFullYear();
  //         if (statement.type === "income" && isCurrentMonth) {
  //           return total + statement.amount;
  //         }
  //         return total;
  //       }, 0);
  //       return totalIncome;
  //     }
  //     return 0;
  //   });
  // }

  function resetStates() {
    setIncomeAmount("");
    setDescription("");
    setDate(new Date());
  }

  function saveStatement() {
    console.log("Saving statement with data:", {
      amount: parseFloat(incomeAmount),
      date,
      type: typeStatement,
      description,
    });
    statementRepo
      .insertStatement({
        amount: parseFloat(incomeAmount),
        date: date,
        type: typeStatement,
        description,
      })
      .then((ret) => {
        handleOpenModal();
        console.log("ret", ret);
        resetStates();
        showRegularToast("Statement saved successfully!"); // Show success toast
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <>
      <ModalContainer
        title={TYPE_DESCRIPTION[typeStatement].modalTitle}
        onSave={saveStatement}
        isVisible={isModalVisible}
        onClose={handleOpenModal}
      >
        <View style={{ padding: 20, gap: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            {TYPE_DESCRIPTION[typeStatement].header}
          </Text>
          <Input
            keyboardType="numeric"
            style={{ height: 50, borderRadius: 0, color: "black" }}
            value={incomeAmount}
            handleChange={setIncomeAmount}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Description
          </Text>
          <Input
            style={{ height: 50, borderRadius: 0 }}
            value={description}
            handleChange={setDescription}
          />

          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Date
          </Text>

          <DateTimePicker
            style={{
              backgroundColor: "white",
              borderRadius: 10,
            }}
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            themeVariant="light"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
            }}
          />
        </View>
      </ModalContainer>
      <MovementView
        handleClickAddButton={openIncomeModal}
        handleClickSubtractButton={openOutcomeModal}
        //totalIncome={getTotalIncome()}
        //totalOutcome={getTotalOutcome()}
      />
    </>
  );
}
