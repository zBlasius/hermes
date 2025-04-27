import { Request, Response } from "express";
import { IUserController } from "./contracts/IUserController";
import { inject, injectable } from "inversify";
import { IUserService } from "../domain";
import { TYPES } from "../utils";
import { connection } from "../../../database/mysql/connection";
import { PoolConnection, QueryError } from "mysql2";

@injectable()
export class UserController implements IUserController {

    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ){

    }

    async login(req: Request, res: Response){
        this.userService.login();
    }
}