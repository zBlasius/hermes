import { Request, Response } from "express";
import { accountModule } from "../../modules";
import { TYPES } from "../../modules/account/utils";

export const signup = async (req: Request, res: Response) => {
    return await accountModule.container
        .get<accountModule.IUserController>(TYPES.UserController)
        .signup(req, res);
};