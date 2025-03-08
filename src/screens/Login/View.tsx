import React from "react";
import {
  View,
  Text
} from "react-native";
import { Button } from "../../components/Button/Container";

export function LoginView() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
        <Text> SignUp View here </Text>
        <Button icon={"google"} title="Sign up with Google" onPress={() => console.log("SignUp")} theme="soft" />
        <Button icon={"apple"} title="Sign up with Apple" onPress={() => console.log("SignUp")} theme="soft" />

    </View>
  );
}

export { LoginView as View };
