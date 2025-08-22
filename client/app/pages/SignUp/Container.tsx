import React from "react";
import SignUpView from "./View";
import { useState } from "react";
import { signUp } from "./services/signUpService";

export default function Container() {
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
    let isEmailValid = isValidEmail(email);
    let isPasswordValid = isValidPassword(password);

    if (!isEmailValid) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if (!isPasswordValid) {
      setValidPassword(false);
      setErrorMessage("Must be atleast 6 characters.");
    } else if (password !== confirmPassword) {
      setValidPassword(false);
      setErrorMessage("Passwords are not equal.");
      isPasswordValid = false;
    } else {
      setValidPassword(true);
      setErrorMessage("");
    }

    return {
      validEmail: isEmailValid,
      validPassword: isPasswordValid
    };
  }

  function handleSignUp() {
    const { validEmail, validPassword } = checkInfo();
    console.log('teste')
    // if (!validEmail || !validPassword) {
    //   return;
    //   }
    signUp({email, password, name: "John Doe"}).then(async ret=> {
      console.log('ret', ret)
      console.log("Sign up successful:", email, password);
    })
  }

  return (
    <SignUpView
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      errorMessage={errorMessage}
      handleButtonPress={() => handleSignUp()}
      handleChangeEmail={(e) => setEmail(e)}
      handleChangePassword={(e) => setPassword(e)}
      handleChangeConfirmPassword={(e)=> setConfirmPassword(e)}
      validEmail={validEmail}
      validPassword={validPassword}
    />
  );
}