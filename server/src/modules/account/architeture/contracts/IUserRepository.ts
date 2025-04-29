import { SignUpData } from '../../domain/contracts/IUserService';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface IUserRepository {
  create(data: SignUpData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}