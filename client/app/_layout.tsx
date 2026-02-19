import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/shared/store/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { View, Text } from "react-native";

import "@/global.css";
import { ToastProvider } from "@/shared/store/ToastProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // const toastConfig = {
  //   success: (text: string) => (
  //     <View
  //       style={{
  //         backgroundColor: "#4CAF50",
  //         padding: 16,
  //         borderRadius: 10,
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Text style={{ color: "white", fontWeight: "bold" }}>{text}</Text>
  //     </View>
  //   ),
  //   // Override other toast types as needed
  // };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <AuthProvider>
          <ToastProvider>
            <ThemeProvider value={DefaultTheme}>
              <ToastManager />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </ToastProvider>
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
