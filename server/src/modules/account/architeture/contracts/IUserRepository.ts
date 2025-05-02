export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'manual' | 'google' | 'apple';
  created_at: Date;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  type: 'manual' | 'google' | 'apple';
}

export interface IUserRepository {
  create(data: SignUpData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}