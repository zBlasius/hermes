// import { UserRepository } from '../UserRepository';
// import { Pool, QueryResult } from 'pg';
// import { InternalServerError } from '../../../../shared/errors/AppError';
// import { describe, it, expect, beforeEach, jest } from '@jest/globals';
// import { User } from '../contracts/IUserRepository';

//TODO - make tests for the UserRepository
// // Mock the database connection
// const mockConnection = {
//   query: jest.fn().mockImplementation(() => Promise.resolve({ rows: [] }))
// } as unknown as Pool;

// describe('UserRepository', () => {
//   let userRepository: UserRepository;

//   beforeEach(() => {
//     userRepository = new UserRepository(mockConnection);
//     jest.clearAllMocks();
//   });

//   describe('create', () => {
//     const mockUserData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'hashedPassword',
//       type: 'manual' as const
//     };

//     it('should create a new user successfully', async () => {
//       const mockResult: QueryResult<User> = {
//         rows: [{
//           id: 1,
//           ...mockUserData,
//           created_at: new Date()
//         }],
//         rowCount: 1,
//         command: '',
//         oid: 0,
//         fields: []
//       };

//       (mockConnection.query as jest.Mock).mockResolvedValue(mockResult);

//       const result = await userRepository.create(mockUserData);

//       expect(result).toEqual(mockResult.rows[0]);
//     });

//     it('should throw InternalServerError when database query fails', async () => {
//       (mockConnection.query as jest.Mock).mockRejectedValue(new Error('Query failed'));

//       await expect(userRepository.create(mockUserData))
//         .rejects
//         .toThrow(InternalServerError);
//     });
//   });

//   describe('findByEmail', () => {
//     const mockEmail = 'john@example.com';

//     it('should find user by email', async () => {
//       const mockUser: User = {
//         id: 1,
//         name: 'John Doe',
//         email: mockEmail,
//         password: 'hashedPassword',
//         type: 'manual',
//         created_at: new Date()
//       };

//       const mockResult: QueryResult<User> = {
//         rows: [mockUser],
//         rowCount: 1,
//         command: '',
//         oid: 0,
//         fields: []
//       };

//       (mockConnection.query as jest.Mock).mockResolvedValue(mockResult);

//       const result = await userRepository.findByEmail(mockEmail);

//       expect(result).toEqual(mockUser);
//     });

//     it('should return null when user is not found', async () => {
//       const mockResult: QueryResult<User> = {
//         rows: [],
//         rowCount: 0,
//         command: '',
//         oid: 0,
//         fields: []
//       };

//       (mockConnection.query as jest.Mock).mockResolvedValue(mockResult);

//       const result = await userRepository.findByEmail(mockEmail);

//       expect(result).toBeNull();
//     });
//   });
// });