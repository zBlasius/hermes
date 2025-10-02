import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Welcome from "../pages/Welcome/Container";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function tabs() {
    // TODO - Colocar aqui demais telas do usuário, conforme o figma
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
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
