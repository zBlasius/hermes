import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "../../shared/components/Button/Container";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Input } from "@/shared/components/Input/Container";

interface LoginProps {
  email: string;
  password: string;
  handleButtonPress: () => void;
  emailError?: string;
  passwordError?: string;
  handleChangeEmail: (text: string) => void;
  handleChangePassword: (text: string) => void;
}

export function LoginView({
  email,
  password,
  handleButtonPress,
  emailError,
  passwordError,
  handleChangeEmail,
  handleChangePassword,
}: LoginProps) {
  return (
    <View
      style={{
        width: "95%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 0.33,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Button
          icon={"google"}
          title="Sign up with Google"
          onPress={() => console.log("SignUp")}
          theme="soft"
        />
        <Button
          icon={"apple"}
          title="Sign up with Apple"
          onPress={() => console.log("SignUp")}
          theme="soft"
        />
      </View>

      <View
        style={{
          width: "100%",
          flex: 0.06,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#777777",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
            zIndex:1
          }}
        >
          or continue with email{" "}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: 1,
            position: "absolute"
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          flex: 0.42,
          display: "flex",
          justifyContent: "center",
          gap: 0,
          paddingVertical: 10,
        }}
      >
          <Input
            placeholder="Email address"
            value={email}
            handleChange={handleChangeEmail}
            icon="mail"
            required={true}
            isValid={!emailError}
            errorMessage={emailError}
          />

          <Input
            placeholder="Password"
            value={password}
            handleChange={handleChangePassword}
            icon="lock"
            type="password"
            required={true}
            isValid={!passwordError}
            errorMessage={passwordError}
          />
      </View>

      <View
        style={{
          width: "100%",
          flex: 0.18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
        }}
      >
        <Button
          title="Login"
          onPress={() => handleButtonPress()}
          theme="primary"
        />
      </View>
    </View>
  );
}

export { LoginView as View };
