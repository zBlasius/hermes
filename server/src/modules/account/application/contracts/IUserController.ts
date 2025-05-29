import { Request, Response } from "express";
import { UserResponse } from "../../domain";

export interface IUserController {
    login(req: Request, res: Response): Promise<void>;
    signup(req: Request, res: Response): Promise<void>;
}