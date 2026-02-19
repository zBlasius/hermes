import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { CircleButton } from "@/shared/components/CircleButton/Container";
import { useData } from "@/shared/store/DataProvider";

export default function MovementView({
  handleClickAddButton,
  handleClickSubtractButton,
}: {
  handleClickAddButton: () => void;
  handleClickSubtractButton: () => void;
}) {
  const { incomeAmount, outcomeAmount } = useData();
  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {new Date().toLocaleString("en-US", { month: "long" })}
          </Text>
        </View>

        <View style={styles.informations}>
          <Text style={styles.infoText}>
            Outcome:{" "}
            <Text style={{ fontWeight: "800", color: "#ff0000" }}>
              -€{outcomeAmount}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            Income:{" "}
            <Text style={{ fontWeight: "800", color: "green" }}>
              €{incomeAmount}
            </Text>
          </Text>
        </View>

        <View style={styles.buttons}>
          <CircleButton
            title="+"
            theme={"green"}
            style={styles.buttonWrapper}
            onPress={handleClickAddButton}
          ></CircleButton>

          <CircleButton
            title="-"
            theme={"red"}
            style={styles.buttonWrapper}
            onPress={handleClickSubtractButton}
          ></CircleButton>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // dark background like screenshot
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Work Sans",
  },
  subHeaderText: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
  },
  informations: {
    alignItems: "center",
    marginVertical: 30,
  },
  infoText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 4,
    fontWeight: "700",
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 14,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
