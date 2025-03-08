import React from "react";
import {
  View,
  Text
} from "react-native";
import { Button } from "../../components/Button/Container";

export function SignUpView() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
        <Text> SignUp View here </Text>
    </View>
  );
}

export { SignUpView as View };
