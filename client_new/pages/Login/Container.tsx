import React from "react-native";
import { View } from "./View";
import { useState } from "react";
import { validateLogin } from "./use-cases/validateLogin";
import * as Keychain from 'react-native-keychain';

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  async function handleLogin() {
    const validation = validateLogin(email, password);

    setEmailError(validation.emailError);
    setPasswordError(validation.passwordError);

    await Keychain.setGenericPassword('jwt', '123');

    const credentials = await Keychain.getGenericPassword();
    
    if (credentials) {
      const token = credentials.password;
    }


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
