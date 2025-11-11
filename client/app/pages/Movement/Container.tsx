import React, {useState} from "react";
import { Text, View } from "react-native";
import MovementView from "./View";
import { StatementLocalRepository } from "../../repositories/Statement/StatementLocalRepository";
import { JobsLocalRepository } from "@/app/repositories/Jobs/JobsLocalRepository";
import ModalContainer from "@/shared/components/Modal/Container";
import { Input } from "@/shared/components/Input/Container";

export default function Container() {
  const statementRepo = new StatementLocalRepository();
  const jobsRepo = new JobsLocalRepository();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [description, setDescription] = useState("");

  function handleOpenModal() {
    setIsModalVisible(!isModalVisible);
  }

  function saveStatement() {
    statementRepo
      .insertState({ id: 1, name: "Gustavo" })
      .then((ret) => {
        console.log("ret", ret);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function subtractStatement() {
    statementRepo
      .getStatements()
      .then((ret) => {
        console.log("get", ret);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleSyncButton() {
    console.log("clicou no sync");
    jobsRepo
      .getJobs()
      .then((ret) => {
        console.log("Jobs fetched for sync:", ret);
      })
      .catch((err) => {
        console.log("Error fetching jobs for sync:", err);
      });
  }

  return (
    <>
      <ModalContainer title="Statements" onSave={()=> console.log('clicou')} isVisible={isModalVisible} onClose={handleOpenModal}>
        <View style={{ padding: 20, gap: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white'}}>Income Amount</Text>
          <Input style={{ height: 50, borderRadius:0, color:'black' }} value={incomeAmount} handleChange={setIncomeAmount} />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }}>Description</Text>
          <Input style={{ height: 50, borderRadius:0 }} value={description} handleChange={setDescription} />

        </View>
      </ModalContainer>
      <MovementView
        handleClickAddButton={saveStatement}
        handleClickSubtractButton={subtractStatement}
        handleSyncButton={handleOpenModal}
      />
    </>
  );
}
