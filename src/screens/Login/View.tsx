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
  handleButtonPress: () => void;
  validEmail: boolean;
  validPassword: boolean;
  handleChangeEmail: (text: string) => void;
  handleChangePassword: (text: string) => void;
}
export function LoginView({
  email,
  password,
  handleButtonPress,
  validEmail,
  validPassword,
  handleChangeEmail,
  handleChangePassword,
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
        margin:"auto"
      }}
    >
      <View
        style={{
          //backgroundColor: "green",
          width: "100%",
          height: "33%",
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
          //backgroundColor: "gray",
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
          //backgroundColor: "gray",
          width: "100%",
          height: "42%",
          display:"flex",
          alignContent:"center",
          justifyContent:"center"
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
          errorMessage="Must be atleast 6 characters."
        />
      </View>

      <View
        style={{
          //backgroundColor: "white",
          width: "100%",
          height: "18%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
