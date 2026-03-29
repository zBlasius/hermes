import { Request, Response } from "express";
import { accountModule } from "../../modules";
import { TYPES } from "../../modules/account/utils";

export const verifyCurrentToken = async (req: Request, res: Response) => {
    return await accountModule.container
        .get<accountModule.IUserController>(TYPES.UserController)
        .verifyCurrentToken(req, res);
};