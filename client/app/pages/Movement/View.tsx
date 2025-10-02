import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";

export default function MovementView({
  handleClickAddButton,
  handleClickSubtractButton
}: {
  handleClickAddButton: () => void;
  handleClickSubtractButton: () => void;
}) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>February</Text>
        <Text style={styles.subHeaderText}>Current week (02/02 - 08/02)</Text>
      </View>

      {/* Informations */}
      <View style={styles.informations}>
        <Text style={styles.infoText}>Outcome: -€100</Text>
        <Text style={styles.infoText}>Income: €400</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonLabel}>INCOME</Text>
          <View style={[styles.circle, { backgroundColor: "green" }]}>
            <Button title="+" onPress={handleClickAddButton} />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonLabel}>OUTCOME</Text>
          <View style={[styles.circle, { backgroundColor: "red" }]}>
            <Text style={styles.circleText}>-</Text>
            <Button title="-" onPress={handleClickSubtractButton} />
          </View>
        </View>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
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
    fontSize: 16,
    color: "#fff",
    marginVertical: 4,
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
