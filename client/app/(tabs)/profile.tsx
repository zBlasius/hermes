import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile() {
  function handleSignOut() {
    console.log("Sign out");
    // auth.signOut() or clear storage here
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <MaterialIcons name="person" size={64} color="#fff" />
      </View>

      <Text style={styles.name}>Your Name</Text>

      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 50,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#464C55",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 32,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: "#ff453a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  signOutText: {
    color: "#ff453a",
    fontSize: 16,
    fontWeight: "500",
  },
});
