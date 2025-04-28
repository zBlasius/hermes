export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface IUserService {
  login(data: LoginData): Promise<UserResponse>;
  signup(data: SignUpData): Promise<UserResponse>;
}