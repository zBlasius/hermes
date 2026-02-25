import * as SecureStore from "expo-secure-store";
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export class AuthenticationService {
  constructor() {}

  static async verifyToken(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync("jwt");
      console.log("Token to verify:", token);

      const response = await fetch(`${API_URL}/api/verify_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("result", response);
      const result = await response.json();
      console.log("result", result);
      if(result.message == "Invalid or expired token") { // TODO - Change this to a more robust error handling, with specific error codes from the server
        await SecureStore.deleteItemAsync("jwt");
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  }
}
