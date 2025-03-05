import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    height: "100%",
    width: "100%",
    borderWidth: 1
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const lightTheme = StyleSheet.create({
  background: { backgroundColor: "#f4f4f4"},
  text: { color: "#333" },
  input: { backgroundColor: "#fff", borderColor: "#ccc", color: "#333" },
});

export const darkTheme = StyleSheet.create({
  background: { backgroundColor: "#222" },
  text: { color: "#fff" },
  input: { backgroundColor: "#333", borderColor: "#555", color: "#fff" },
});
