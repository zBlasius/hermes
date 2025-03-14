import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button/Container";
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
import { Input } from "@/src/components/Input/Container";

interface LoginProps {
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
  handleButtonPress: () => void;
  validEmail: boolean;
  validPassword: boolean;
  handleChangeEmail: (text: string) => void;
  handleChangePassword: (text: string) => void;
  handleChangeConfirmPassword: (text:string) => void;
}
export function SignUpView({
  email,
  password,
  confirmPassword,
  errorMessage,
  handleButtonPress,
  validEmail,
  validPassword,
  handleChangeEmail,
  handleChangePassword,
  handleChangeConfirmPassword
}: LoginProps) {
  return (
    <View
      style={{
        width: "95%",
        height: "90%",
        //backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        margin: "auto",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#777777",
            zIndex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          register with accounts{" "}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: 1,
            position: "absolute",
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "12%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 16,
        }}
      >
        <Button
          title="Google"
          onPress={() => console.log("SignUp")}
          theme="primary"
          type="small"
        />
        <Button
          title="Apple"
          onPress={() => console.log("SignUp")}
          theme="primary"
          type="small"
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "6%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#777777",
            zIndex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          or continue with email{" "}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: 1,
            position: "absolute",
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "69%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          zIndex:3
        }}
      >
        <Input
          placeholder="Email address"
          value={email}
          handleChange={handleChangeEmail}
          icon="mail"
          required={true}
          isValid={validEmail}
          errorMessage="Invalid email adress"
        />

        <Input
          placeholder="Password"
          value={password}
          handleChange={handleChangePassword}
          icon="lock"
          type="password"
          required={true}
          isValid={validPassword}
          errorMessage={errorMessage}
        />

        <Input
          placeholder="Confirm password"
          value={confirmPassword}
          handleChange={handleChangeConfirmPassword}
          icon="lock"
          type="password"
          required={true}
          isValid={validPassword}
          errorMessage={errorMessage}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "6%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          title="Register"
          onPress={() => handleButtonPress()}
          theme="primary"
        />
      </View>
    </View>
  );
}

export { SignUpView as View };
