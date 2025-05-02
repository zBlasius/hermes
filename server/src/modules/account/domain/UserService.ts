import { injectable, inject } from "inversify";
import { IUserService, SignUpData, UserResponse, LoginData, GoogleLoginData, AppleLoginData } from "./contracts/IUserService";
import { TYPES } from "../utils";
import { IUserRepository } from "../architeture/contracts/IUserRepository";
import { ConflictError, InternalServerError } from "../../../shared/errors/AppError";
import bcrypt from 'bcrypt';
import jwt, { JwtHeader } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import JwksClient from 'jwks-rsa';
import { jwtDecode } from 'jwt-decode';

interface AppleJWTPayload extends jwt.JwtPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: string;
  is_private_email: string;
  auth_time: number;
}

interface AppleAuthKeys {
  keys: {
    kty: string;
    alg: string;
    use: string;
    kid: string;
    n: string;
    e: string;
  }[];
}

interface JwtHeaderWithKid extends JwtHeader {
  kid: string;
}

const APPLE_AUTH_TOKEN_URL = 'https://appleid.apple.com/auth/keys';
const APPLE_ISSUER = 'https://appleid.apple.com';

@injectable()
export class UserService implements IUserService {
    private googleClient: OAuth2Client;

    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ) {
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    private generateAccessToken(payload: { userId: number, email: string }): string {
        const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
        
        return jwt.sign(
            payload,
            SECRET_KEY,
            { expiresIn: '7d' }
        );
    }

    private async verifyGoogleToken(token: string): Promise<{ email: string; name: string }> {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();
            if (!payload) {
                throw new ConflictError('Invalid Google token');
            }

            return {
                email: payload.email!,
                name: payload.name!
            };
        } catch (error) {
            throw new ConflictError('Invalid Google token');
        }
    }

    async loginWithGoogle(data: GoogleLoginData): Promise<UserResponse> {
        try {
            const { email, name } = await this.verifyGoogleToken(data.token);
            
            // Check if user exists
            let user = await this.userRepository.findByEmail(email);
            
            if (!user) {
                throw new ConflictError('User not found');
            }

            const token = this.generateAccessToken({
                userId: user.id,
                email: user.email
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new InternalServerError('Failed to login with Google');
        }
    }

    async login(data: LoginData): Promise<UserResponse> {
        const user = await this.userRepository.findByEmail(data.email);
        
        if (!user) {
            throw new ConflictError('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordValid) {
            throw new ConflictError('Invalid email or password');
        }

        const token = this.generateAccessToken({
            userId: user.id,
            email: user.email
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        };
    }

    async signup(data: SignUpData): Promise<UserResponse> {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new ConflictError('Email already exists');
            }

            // Hash password
            const hashedPassword = await this.hashPassword(data.password);

            // Create user
            const user = await this.userRepository.create({
                ...data,
                password: hashedPassword,
                type: 'manual'
            });

            // Generate token
            const token = this.generateAccessToken({
                userId: user.id,
                email: user.email
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new InternalServerError('Failed to create user');
        }
    }

    async signUpByGoogle(data: GoogleLoginData): Promise<UserResponse> {
        try {
            const { email, name } = await this.verifyGoogleToken(data.token);
            
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new ConflictError('Email already exists');
            }

            // Generate a random password for Google users
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await this.hashPassword(randomPassword);

            // Create user
            const user = await this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                type: 'google'
            });

            // Generate token
            const token = this.generateAccessToken({
                userId: user.id,
                email: user.email
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new InternalServerError('Failed to create user with Google');
        }
    }

    private async verifyAppleToken(token: string): Promise<{ email: string; name: string }> {
        try {
            const tokenDecodedHeader = jwtDecode<JwtHeaderWithKid>(token, {
                header: true,
            });

            const { data: applePublicKey } = await axios.get<AppleAuthKeys>(APPLE_AUTH_TOKEN_URL);

            const client = JwksClient({
                jwksUri: APPLE_AUTH_TOKEN_URL,
            });

            const sharedKid = applePublicKey.keys.find(
                (key) => key.kid === tokenDecodedHeader.kid,
            )?.kid;

            if (!sharedKid) {
                throw new ConflictError('Invalid Apple token: kid not found');
            }

            const key = await client.getSigningKey(sharedKid);
            const signingKey = key.getPublicKey();

            const payload = jwt.verify(token, signingKey) as AppleJWTPayload;

            // Validate token
            if (payload.iss !== APPLE_ISSUER) {
                throw new ConflictError('Invalid Apple token: issuer mismatch');
            }

            if (payload.aud !== process.env.APPLE_BUNDLE_ID) {
                throw new ConflictError('Invalid Apple token: audience mismatch');
            }

            if (!payload.email) {
                throw new ConflictError('Invalid Apple token: email not provided');
            }

            // Apple might not provide the name in subsequent sign-ins
            const name = 'Apple User';

            return {
                email: payload.email,
                name
            };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new ConflictError('Invalid Apple token: JWT verification failed');
            }
            if (error instanceof Error) {
                throw error;
            }
            throw new ConflictError('Invalid Apple token');
        }
    }

    async loginWithApple(data: AppleLoginData): Promise<UserResponse> {
        try {
            const { email, name } = await this.verifyAppleToken(data.token);
            
            // Check if user exists
            let user = await this.userRepository.findByEmail(email);
            
            if (!user) {
                throw new ConflictError('User not found');
            }

            const token = this.generateAccessToken({
                userId: user.id,
                email: user.email
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new InternalServerError('Failed to login with Apple');
        }
    }

    async signUpByApple(data: AppleLoginData): Promise<UserResponse> {
        try {
            const { email, name } = await this.verifyAppleToken(data.token);
            
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new ConflictError('Email already exists');
            }

            // Generate a random password for Apple users
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await this.hashPassword(randomPassword);

            // Create user
            const user = await this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                type: 'apple'
            });

            // Generate token
            const token = this.generateAccessToken({
                userId: user.id,
                email: user.email
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new InternalServerError('Failed to create user with Apple');
        }
    }
}