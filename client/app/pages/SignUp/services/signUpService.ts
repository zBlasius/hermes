import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";
const API_URL = Constants?.expoConfig?.extra?.apiUrl;


export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    console.log('API_URL 22', API_URL)
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('response', response)
    if (!response.ok) {
      console.log('Error response:', response)
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const result = await response.json();
    console.log('result', result) 
    await SecureStore.setItemAsync("jwt", result.token);
    
    console.log('after key chain')

    const teste = await SecureStore.getItemAsync("jwt");
    console.log('Informações presentes na KeyChain', teste);

    return result;
  } catch (error) {
    console.log('error', error)
    if (error instanceof Error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during sign up');
  }
}; 

export default signUp