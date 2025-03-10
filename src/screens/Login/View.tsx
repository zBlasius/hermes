import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button/Container";

export function LoginView() {
  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <View
        style={{
          backgroundColor: "green",
          width: "100%",
          height: "33%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Buttons container  */}
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
          backgroundColor: "gray",
          width: "100%",
          height: "6%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "gray",
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
          backgroundColor: "gray",
          width: "100%",
          height: "27%",
        }}
      >
        <Text> Inputs here </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "33%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Login"
          onPress={() => console.log("Login")}
          theme="primary"
        />
      </View>
    </View>
  );
}

export { LoginView as View };
