import React from "react";
import  LoginView from "./View";
import { useState } from "react";
import validateLogin from "./use-cases/validateLogin";
import * as Keychain from 'react-native-keychain';
import { api } from "@/shared/services/api";

export default function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  async function handleLogin() {
    const validation = validateLogin(email, password);

    setEmailError(validation.emailError);
    setPasswordError(validation.passwordError);

    console.log("api", api.defaults.baseURL);
    
    api.post("/login", { email, password })
      .then(async (response:any) => { // TODO - handle response
        console.log("Login successful:", response.data);
      })
      .catch((error:any) => { // TODO - handle response
        console.error("Login failed:", error);
      });


    const credentials = await Keychain.getGenericPassword();
    
    if (credentials) {
      const token = credentials.password;
    }


    if (validation.isValid) {
      console.log("Login attempt with:", email, password);
    }
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