import React from "react";
import {
  View,
  Text
} from "react-native";

export function RegisterView() {
  return (
    <View
      style={{
        width: "100%",
        height: "23%",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
        <Text> Register </Text>
    </View>
  );
}

export { RegisterView as View };
