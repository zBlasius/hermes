import React, { useState, PropsWithChildren, useEffect } from "react";
import WelcomeView from "./View";
import { useAuth } from "@/shared/store/AuthProvider";

export default function Container({ children }: PropsWithChildren<{}>) {
  type Tab = "Login" | "SignUp";
  const [currentTab, setCurrentTab] = useState<Tab>("Login");
  const { token } = useAuth();

  useEffect(() => {
    console.log('atualizações do token', token)
  }, [token]);

  return (
    <>
      {true ? (
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