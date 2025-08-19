import * as Keychain from 'react-native-keychain';
import { API_URL } from '@env';

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
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const result = await response.json();
    await Keychain.setGenericPassword('token', result.token); // Store token securely

    const teste = await Keychain.getGenericPassword();
    console.log('Informações presentes na KeyChain', teste);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during sign up');
  }
}; 

export default signUp