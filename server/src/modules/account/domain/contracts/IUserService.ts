export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GoogleLoginData {
  token: string;
}

export interface AppleLoginData {
  token: string;
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
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
  loginWithGoogle(data: GoogleLoginData): Promise<UserResponse>;
  signUpByGoogle(data: GoogleLoginData): Promise<UserResponse>;
  loginWithApple(data: AppleLoginData): Promise<UserResponse>;
  signUpByApple(data: AppleLoginData): Promise<UserResponse>;
}