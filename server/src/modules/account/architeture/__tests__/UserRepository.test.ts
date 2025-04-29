import { UserRepository } from '../UserRepository';
import { Pool, PoolConnection } from 'mysql2';
import { InternalServerError } from '../../../../shared/errors/AppError';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock the database connection
// @ts-ignore
const mockConnection = {
  getConnection: jest.fn()
} as unknown as Pool;

const mockPoolConnection = {
  query: jest.fn(),
  release: jest.fn()
} as unknown as PoolConnection;

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository(mockConnection);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword'
    };

    // it('should create a new user successfully', async () => {
    //   const mockResult = {
    //     insertId: 1
    //   };

    //   const mockConnectionListener = jest.spyOn(mockConnection, 'getConnection');
      
    //   mockConnectionListener.mockImplementation((callback:any) => {
    //     callback(null, mockPoolConnection);
    //   });

    //   (mockPoolConnection.query as jest.Mock).mockImplementation((sql: unknown, params: unknown, callback: Function) => {
    //     callback(null, mockResult);
    //   });

    //   const result = await userRepository.create(mockUserData);

    //   expect(result).toEqual({
    //     id: mockResult.insertId,
    //     name: mockUserData.name,
    //     email: mockUserData.email,
    //     password: mockUserData.password,
    //     created_at: expect.any(Date)
    //   });
    //   expect(mockPoolConnection.release).toHaveBeenCalled();
    // });

    it('should throw InternalServerError when database connection fails', async () => {
      (mockConnection.getConnection as jest.Mock).mockImplementation((callback:any) => {
        callback(new Error('Connection failed'));
      });

      await expect(userRepository.create(mockUserData))
        .rejects
        .toThrow(InternalServerError);
    });
  });

  describe('findByEmail', () => {
    const mockEmail = 'john@example.com';

    it('should find user by email', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: mockEmail,
        password: 'hashedPassword',
        created_at: new Date()
      };

      (mockConnection.getConnection as jest.Mock).mockImplementation((callback:any) => {
        callback(null, mockPoolConnection);
      });

      (mockPoolConnection.query as jest.Mock).mockImplementation((sql, params, callback:any) => {
        callback(null, [mockUser]);
      });

      const result = await userRepository.findByEmail(mockEmail);

      expect(result).toEqual(mockUser);
      expect(mockPoolConnection.release).toHaveBeenCalled();
    });

    it('should return null when user is not found', async () => {
      (mockConnection.getConnection as jest.Mock).mockImplementation((callback:any) => {
        callback(null, mockPoolConnection);
      });

      (mockPoolConnection.query as jest.Mock).mockImplementation((sql, params, callback:any) => {
        callback(null, []);
      });

      const result = await userRepository.findByEmail(mockEmail);

      expect(result).toBeNull();
      expect(mockPoolConnection.release).toHaveBeenCalled();
    });
  });
});