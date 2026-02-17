import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import { styles } from "./themes";
import Tabs from "../../../shared/components/Tabs/Container";
import SignUp from "../SignUp/Container";
import Login from "../Login/Container";

export default function WelcomeView(props: {
  handleChangeTab: (tab: String) => void;
  currentTab: "Login" | "SignUp";
}) {
  const objComponent = { Login: <Login />, SignUp: <SignUp /> };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
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
          <ScrollView
            style={{
              width: "100%",
              height: "67%",
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ flex: 1, backgroundColor: "#777777" }}>
              <Tabs
                list={["Login", "Sign Up"]}
                handleSelectTab={(tab) => props.handleChangeTab(tab)}
              />
              {objComponent[props.currentTab || "Login"]}
            </View>

            <View
              style={{
                width: "100%",
                height: "10%",
                backgroundColor: "#777777",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontSize: 13.26,
                    color: "white",
                    fontWeight: 400,
                    fontFamily: "Work Sans",
                    textAlign: "center",
                    flexWrap: "wrap",
                    margin: "auto",
                  }}
                >
                  By signing in with an account, you agree to SO's Terms of
                  Service and Privacy Policy.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}