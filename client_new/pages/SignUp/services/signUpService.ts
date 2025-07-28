
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
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL
    console.log('api_base_url', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during sign up');
  }
}; 