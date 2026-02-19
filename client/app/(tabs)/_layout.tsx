import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Welcome from "../pages/Welcome/Container";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTabStore } from "@/shared/store/AuthProvider";
import { useData } from "@/shared/store/DataProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { changeTab } = useTabStore();
  const { calculateTotalAmount } = useData();
  
  useEffect(() => {
    calculateTotalAmount();
  }, []);

  // TODO - Colocar aqui demais telas do usuário, conforme o figma
  function tabs() {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          }}
          screenListeners={{
            tabPress: (e) => {
              const parts = e?.target?.split("-");
              if (!parts) return;
              console.log('parts', parts);
              const result = parts[0] ?? null;
              changeTab(result || "default");
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }: any) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="reports"
            options={{
              title: "Reports",
              tabBarIcon: ({ color }: any) => (
                <IconSymbol size={28} name="chart.bar.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: "Budget",
              tabBarIcon: ({ color }: any) => (
                <IconSymbol size={28} name="wallet.pass" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }: any) => (
                <IconSymbol size={28} name="chevron.up.square" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    );
  }

  return <Welcome> {tabs()} </Welcome>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111", // match background
  },
});
