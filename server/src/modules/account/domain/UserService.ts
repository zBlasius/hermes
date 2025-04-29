import { injectable, inject } from "inversify";
import { IUserService, SignUpData, UserResponse } from "./contracts/IUserService";
import { LoginData } from "./contracts/IUserService";
import { TYPES } from "../utils";
import { IUserRepository } from "../architeture/contracts/IUserRepository";
import { ConflictError, InternalServerError } from "../../../shared/errors/AppError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ) {}

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
                password: hashedPassword
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
}