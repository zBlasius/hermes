import { signUp } from '../services/signUpService';

// Mock fetch
global.fetch = jest.fn();

describe('signUp', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should successfully sign up a user', async () => {
    const mockResponse = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      token: 'mock-token'
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await signUp({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/account/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        }),
      }
    );
  });

  it('should throw an error when the server returns an error', async () => {
    const mockError = {
      message: 'Email already exists'
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(mockError)
    });

    await expect(signUp({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })).rejects.toThrow('Sign up failed: Email already exists');
  });

  it('should throw an error when the network request fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(signUp({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })).rejects.toThrow('Sign up failed: Network error');
  });
}); 