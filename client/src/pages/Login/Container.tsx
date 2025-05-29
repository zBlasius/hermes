import React from "react-native";
import { View } from "./View";
import { useState } from "react";
import { validateLogin } from "./use-cases/validateLogin";

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  function handleLogin() {
    const validation = validateLogin(email, password);

    setEmailError(validation.emailError);
    setPasswordError(validation.passwordError);

    if (validation.isValid) {
      console.log("Login attempt with:", email, password);
    }
  }

  return (
    <View
      email={email}
      password={password}
      handleButtonPress={handleLogin}
      emailError={emailError}
      passwordError={passwordError}
      handleChangeEmail={setEmail}
      handleChangePassword={setPassword}
    />
  );
}

export { Container as Login };
