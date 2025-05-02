import { Request, Response } from "express";
import { IUserController } from "./contracts/IUserController";
import { inject, injectable } from "inversify";
import { IUserService } from "../domain";
import { TYPES } from "../utils";
import { BadRequestError, UnauthorizedError, ConflictError } from "../../../shared/errors/AppError";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password, type = 'manual' } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Email and password are required');
            }

            let result;
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
                    throw new BadRequestError('Invalid authentication type');
            }

            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                throw new UnauthorizedError(error.message);
            }
            throw error;
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const { name, email, password, type = 'manual' } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Email and password are required');
            }

            if (type === 'manual' && !name) {
                throw new BadRequestError('Name is required for manual signup');
            }

            let result;
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
            if (error instanceof Error) {
                if (error.message.includes('already exists')) {
                    throw new ConflictError('Email already exists');
                }
                throw new BadRequestError(error.message);
            }
            throw error;
        }
    }
}   