import React from "react";
import MovementView from "./View";
import { StatementLocalRepository } from "../../repositories/Statement/StatementLocalRepository";
import { JobsLocalRepository } from "@/app/repositories/Jobs/JobsLocalRepository";

export default function Container() {
  const statementRepo = new StatementLocalRepository();
  const jobsRepo = new JobsLocalRepository();

  function saveStatement() {
    statementRepo
      .insertState({ id: 1, name: "Gustavo"})
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
    jobsRepo.getJobs().then((ret) => {
      console.log("Jobs fetched for sync:", ret);
    }).catch((err) => {
      console.log("Error fetching jobs for sync:", err);
    });
  }

  return (
    <MovementView
      handleClickAddButton={saveStatement}
      handleClickSubtractButton={subtractStatement}
      handleSyncButton={handleSyncButton}
    />
  );
}
