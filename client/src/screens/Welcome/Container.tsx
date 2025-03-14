
import React, { useState } from "react";
import { View } from "./View";

function Container() {
  type Tab = "Login" | "SignUp";
  const [currentTab, setCurrentTab] = useState<Tab>("Login");
  return (
    <View currentTab={currentTab} handleChangeTab={(tab)=> setCurrentTab(tab as Tab)}/>
  );
}

export { Container as Welcome }; 