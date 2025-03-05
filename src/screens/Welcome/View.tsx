import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
} from "react-native";
import { styles, darkTheme, lightTheme } from "./themes";
import Tabs from "../../components/Tabs/Container";

export function WelcomeView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ ...styles.container }}>
      <View // ** Header
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
        <Text
          style={{
            fontSize: 32,
            fontWeight: 600,
            fontFamily: "Work Sans",
            color: "white",
          }}
        >
          {" "}
          Welcome to Hermes{" "}
        </Text>
        <Text
          style={{
            fontSize: 17.26,
            width: "80%",
            textAlign: "center",
            color: "white",
            fontWeight: 400,
            fontFamily: "Work Sans",
          }}
        >
          {" "}
          Login or Sign up to access your account{" "}
        </Text>
      </View>
      <View // ** Content
        style={{
          width: "100%",
          height: "67%",
          backgroundColor: "#777777",
          borderStyle: "solid"
        }}
      >
        <Tabs
          list={["Login", "Sign Up"]}
          handleSelectTab={(tab) => console.log("Selected: ", tab)}
        />

        <Text></Text>
      </View>
      <View // ** Footer
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "#777777",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* // TODO - create specific component to it  */}
        <Text
          style={{
            fontSize: 13.26,
            width: "100%",
            color: "white",
            fontWeight: 400,
            fontFamily: "Work Sans",
            textAlign: "center",
            paddingHorizontal: 30,
          }}
        >
          {" "}
          By signing in with an account, you agree to SO's Terms of Service and
          Privacy Policy.{" "}
        </Text>
      </View>
    </View>
  );
}

export { WelcomeView as View };
