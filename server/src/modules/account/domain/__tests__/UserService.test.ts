import { UserService } from '../UserService';
import { IUserRepository } from '../../architeture/contracts/IUserRepository';
import { ConflictError } from '../../../../shared/errors/AppError';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashedPassword')),
  compare: jest.fn().mockImplementation(() => Promise.resolve(true))
}));

// Mock the repository
const mockUserRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn()
} as jest.Mocked<IUserRepository>;

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
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
        created_at: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(false));

      await expect(userService.login(mockLoginData))
        .rejects
        .toThrow(ConflictError);
    });
  });
}); 