import React, { useState, useEffect, Component, Fragment } from "react";
import "@/global.css";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Welcome } from "./src/pages/Welcome/Container";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >

        <Welcome />
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [name, setName] = useState("");

  // Define os estilos dinâmicos conforme o tema
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  const [loaded, error] = useFonts({
    "Work-Sans": require("./assets/fonts/Work Sans.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GluestackUIProvider>
      {/* Add your app code here */}
      <View style={[styles.container, themeStyles.background]}>
        <Welcome />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    height: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});

const lightTheme = StyleSheet.create({
  background: { backgroundColor: "#f4f4f4" },
  text: { color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    color: "#333",
  },
});

const darkTheme = StyleSheet.create({
  background: { backgroundColor: "#000000" },
  text: { color: "#fff" },
  input: {
    backgroundColor: "#333",
    borderColor: "#555",
    color: "#fff",
  },
});
