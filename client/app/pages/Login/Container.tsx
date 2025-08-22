import React from "react";
import  LoginView from "./View";
import { useState } from "react";
import validateLogin from "./use-cases/validateLogin";
import login from "./services/loginService";

export default function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  async function handleLogin() {
    const validation = validateLogin(email, password);

    setEmailError(validation.emailError);
    setPasswordError(validation.passwordError);

    
    if (!validation.isValid) {
      console.log('login invalid')
      return;
    }

    await login({ email, password })
  }

  return (
    <LoginView
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