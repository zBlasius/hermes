import React from "react-native";
import { View } from "./View";
import { useState } from "react";

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  function isValidEmail(value: string) {
    if (!value) return false;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(value);
  }

  function isValidPassword(password: string) {
    return password && password.length >= 6;
  }
  
  function checkInfo() {
    console.log("checked", email, password);
    if (!isValidEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if (!isValidPassword(password)) {
      setValidPassword(false);
      setErrorMessage("Must be atleast 6 characters.")
    } else {
      setValidPassword(true);
      setErrorMessage("")
    }

    if(password !== confirmPassword){
      setValidPassword(false);
      setErrorMessage("Passwords are not equal.")
    }

    if (!validEmail || !validPassword) {
      return;
    }
    
  }

  return (
    <View
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      errorMessage={errorMessage}
      handleButtonPress={() => checkInfo()}
      handleChangeEmail={(e) => setEmail(e)}
      handleChangePassword={(e) => setPassword(e)}
      handleChangeConfirmPassword={(e)=> setConfirmPassword(e)}
      validEmail={validEmail}
      validPassword={validPassword}
    />
  );
}

export { Container as SignUp };
