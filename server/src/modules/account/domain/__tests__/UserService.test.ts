import { UserService } from '../UserService';
import { IUserRepository } from '../../architeture/contracts/IUserRepository';
import { ConflictError } from '../../../../shared/errors/AppError';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import * as jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashedPassword')),
  compare: jest.fn().mockImplementation(() => Promise.resolve(true))
}));

// Mock google-auth-library
jest.mock('google-auth-library', () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({
    verifyIdToken: jest.fn()
  }))
}));

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve({
    data: {
      keys: [{
        kty: 'RSA',
        alg: 'RS256',
        use: 'sig',
        kid: 'test-kid',
        n: 'test-n',
        e: 'test-e'
      }]
    }
  }))
}));

// Mock jwks-rsa
jest.mock('jwks-rsa', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    getSigningKey: jest.fn().mockImplementation(() => Promise.resolve({
      getPublicKey: () => 'test-public-key'
    }))
  }))
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockImplementation(() => ({
    iss: 'https://appleid.apple.com',
    aud: 'test-bundle-id',
    exp: Date.now() + 3600,
    iat: Date.now(),
    sub: 'test-sub',
    nonce: 'test-nonce',
    c_hash: 'test-c-hash',
    email: 'john@example.com',
    email_verified: 'true',
    is_private_email: 'false',
    auth_time: Date.now()
  }))
}));

// Mock the repository
const mockUserRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn()
} as jest.Mocked<IUserRepository>;

describe('UserService', () => {
  let userService: UserService;
  let mockGoogleClient: jest.Mocked<OAuth2Client>;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
    mockGoogleClient = (userService as any).googleClient;
    jest.clearAllMocks();
  });

  describe('signup', () => {
    const mockSignUpData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    it('should create a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: mockSignUpData.name,
        email: mockSignUpData.email,
        password: 'hashedPassword',
        type: 'manual' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await userService.signup(mockSignUpData);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockSignUpData.email);
      expect(result.name).toBe(mockSignUpData.name);
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(mockSignUpData.password, 10);
    });

    it('should throw ConflictError if email already exists', async () => {
      const existingUser = {
        id: 1,
        name: 'Existing User',
        email: mockSignUpData.email,
        password: 'hashedPassword',
        type: 'manual' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(userService.signup(mockSignUpData))
        .rejects
        .toThrow(ConflictError);
    });
  });

  describe('login', () => {
    const mockLoginData = {
      email: 'john@example.com',
      password: 'password123'
    };

    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: mockLoginData.email,
        password: 'hashedPassword',
        type: 'manual' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(true));

      const result = await userService.login(mockLoginData);

      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockLoginData.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, mockUser.password);
    });

    it('should throw ConflictError with invalid credentials', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(userService.login(mockLoginData))
        .rejects
        .toThrow(ConflictError);
    });

    it('should throw ConflictError with invalid password', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: mockLoginData.email,
        password: 'hashedPassword',
        type: 'manual' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(false));

      await expect(userService.login(mockLoginData))
        .rejects
        .toThrow(ConflictError);
    });
  });

  describe('loginWithGoogle', () => {
    const mockGoogleToken = 'mock-google-token';
    const mockGoogleUser = {
      email: 'john@example.com',
      name: 'John Doe'
    };

    it('should create a new user and login successfully with valid Google token', async () => {
      const mockTicket = {
        getPayload: () => ({
          email: mockGoogleUser.email,
          name: mockGoogleUser.name
        })
      };
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.resolve(mockTicket));

      const mockUser = {
        id: 1,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        password: 'hashedPassword',
        type: 'google' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await userService.loginWithGoogle({ token: mockGoogleToken });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockGoogleUser.email);
      expect(result.name).toBe(mockGoogleUser.name);
      expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it('should login existing user with valid Google token', async () => {
      const mockTicket = {
        getPayload: () => ({
          email: mockGoogleUser.email,
          name: mockGoogleUser.name
        })
      };
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.resolve(mockTicket));

      const mockUser = {
        id: 1,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        password: 'hashedPassword',
        type: 'google' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.loginWithGoogle({ token: mockGoogleToken });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockGoogleUser.email);
      expect(result.name).toBe(mockGoogleUser.name);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictError with invalid Google token', async () => {
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.reject(new ConflictError('Invalid token')));

      await expect(userService.loginWithGoogle({ token: mockGoogleToken }))
        .rejects
        .toThrow(ConflictError);
    });
  });

  describe('signUpByGoogle', () => {
    const mockGoogleToken = 'mock-google-token';
    const mockGoogleUser = {
      email: 'john@example.com',
      name: 'John Doe'
    };

    it('should create a new user successfully with valid Google token', async () => {
      const mockTicket = {
        getPayload: () => ({
          email: mockGoogleUser.email,
          name: mockGoogleUser.name
        })
      };
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.resolve(mockTicket));

      const mockUser = {
        id: 1,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        password: 'hashedPassword',
        type: 'google' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await userService.signUpByGoogle({ token: mockGoogleToken });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockGoogleUser.email);
      expect(result.name).toBe(mockGoogleUser.name);
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled();
    });

    it('should throw ConflictError if email already exists', async () => {
      const mockTicket = {
        getPayload: () => ({
          email: mockGoogleUser.email,
          name: mockGoogleUser.name
        })
      };
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.resolve(mockTicket));

      const existingUser = {
        id: 1,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        password: 'hashedPassword',
        type: 'google' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(userService.signUpByGoogle({ token: mockGoogleToken }))
        .rejects
        .toThrow(ConflictError);
    });

    it('should throw ConflictError with invalid Google token', async () => {
      (mockGoogleClient.verifyIdToken as jest.Mock).mockImplementation(() => Promise.reject(new ConflictError('Invalid token')));

      await expect(userService.signUpByGoogle({ token: mockGoogleToken }))
        .rejects
        .toThrow(ConflictError);
    });
  });

  describe('loginWithApple', () => {
    const mockAppleToken = 'mock-apple-token';
    const mockAppleUser = {
      email: 'john@example.com',
      name: 'Apple User'
    };

    it('should login successfully with valid Apple token', async () => {
      const mockUser = {
        id: 1,
        name: mockAppleUser.name,
        email: mockAppleUser.email,
        password: 'hashedPassword',
        type: 'apple' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.loginWithApple({ token: mockAppleToken });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockAppleUser.email);
      expect(result.name).toBe(mockAppleUser.name);
    });

    it('should throw ConflictError if user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(userService.loginWithApple({ token: mockAppleToken }))
        .rejects
        .toThrow(ConflictError);
    });
  });

  describe('signUpByApple', () => {
    const mockAppleToken = 'mock-apple-token';
    const mockAppleUser = {
      email: 'john@example.com',
      name: 'Apple User'
    };

    it('should create a new user successfully with valid Apple token', async () => {
      const mockUser = {
        id: 1,
        name: mockAppleUser.name,
        email: mockAppleUser.email,
        password: 'hashedPassword',
        type: 'apple' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await userService.signUpByApple({ token: mockAppleToken });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(mockAppleUser.email);
      expect(result.name).toBe(mockAppleUser.name);
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled();
    });

    it('should throw ConflictError if email already exists', async () => {
      const existingUser = {
        id: 1,
        name: mockAppleUser.name,
        email: mockAppleUser.email,
        password: 'hashedPassword',
        type: 'apple' as 'manual' | 'google' | 'apple',
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(userService.signUpByApple({ token: mockAppleToken }))
        .rejects
        .toThrow(ConflictError);
    });
  });
}); 