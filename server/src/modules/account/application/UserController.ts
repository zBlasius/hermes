import { Request, Response } from "express";
import { IUserController } from "./contracts/IUserController";
import { inject, injectable } from "inversify";
import { IUserService, UserResponse } from "../domain";
import { TYPES } from "../utils";
import { BadRequestError, UnauthorizedError, ConflictError } from "../../../shared/errors/AppError";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, type = 'manual' } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Email and password are required');
            }

            console.log('entrou aqui 1')
 
            let result: UserResponse;
            switch (type) {
                case 'manual':
                    result = await this.userService.login({ email, password });
                    break;
                case 'google':
                    result = await this.userService.loginWithGoogle({ token: password });
                    break;
                case 'apple':
                    result = await this.userService.loginWithApple({ token: password });
                    break;
                default:
                    console.log('entrou aqui 4')
                    throw new BadRequestError('Invalid authentication type');
            }
 
            res.status(200).json(result);
        } catch (error) {
            console.log('entrou aqui 2')
            if (error instanceof AppError) {
                throw new UnauthorizedError(error.message); 
            }
            throw new UnauthorizedError('An unexpected error occurred');
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, type = 'manual' } = req.body;
  
            console.log('req.body', req.body);  
            if (!email || !password) {
                throw new BadRequestError('Email and password are required'); 
            }

            if (type === 'manual' && !name) {
                throw new BadRequestError('Name is required for manual signup');
            }

            let result: UserResponse; 
            switch (type) { 
                case 'manual':
                    result = await this.userService.signup({ name, email, password });
                    break;
                case 'google':
                    result = await this.userService.signUpByGoogle({ token: password });
                    break;
                case 'apple':
                    result = await this.userService.signUpByApple({ token: password });
                    break;
                default:
                    throw new BadRequestError('Invalid authentication type');
            }

            res.status(201).json(result);
        } catch (error) {
            //TODO - It shouldn't crash the server in case of an error
            if (error instanceof AppError) {
                throw error; // Let the error handling middleware handle it
            }
            throw new BadRequestError('An unexpected error occurred');
        }
    }
}   