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
  login(data: LoginData): Promise<UserResponse | null>;
  signup(data: SignUpData): Promise<UserResponse | null>;
  loginWithGoogle(data: GoogleLoginData): Promise<UserResponse | null>;
  signUpByGoogle(data: GoogleLoginData): Promise<UserResponse | null>;
  loginWithApple(data: AppleLoginData): Promise<UserResponse | null>;
  signUpByApple(data: AppleLoginData): Promise<UserResponse | null>;
}