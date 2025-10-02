import Constants from "expo-constants";
const API_URL = Constants?.expoConfig?.extra?.apiUrl;

export interface LoginRequest {
  email: string;
  password: string;
  type: 'manual' | 'google' | 'apple';
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('Error response login:', response);
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log('login error', error);
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during login');
  }
};

export default login;