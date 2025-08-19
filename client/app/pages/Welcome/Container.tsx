import React, { useState, PropsWithChildren } from "react";
import WelcomeView from "./View";

export default function Container({ children }: PropsWithChildren<{}>) {
  type Tab = "Login" | "SignUp";
  const [currentTab, setCurrentTab] = useState<Tab>("Login");

  const loginBoolean = true; // Make JWT validations here

  return (
    <>
      {loginBoolean ? (
        <WelcomeView
          currentTab={currentTab}
          handleChangeTab={(tab) => setCurrentTab(tab as Tab)}
        />
      ) : (
        children
      )}
    </>
  );
}