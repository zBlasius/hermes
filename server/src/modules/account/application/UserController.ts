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
            const { email, password } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Email and password are required');
            }

            const result = await this.userService.login({ email, password });
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
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                throw new BadRequestError('Name, email and password are required');
            }

            const result = await this.userService.signup({ name, email, password });
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