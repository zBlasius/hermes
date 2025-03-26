import { Request, Response } from "express";
import { IUserController } from "./contracts/IUserController";
import { injectable } from "inversify";

@injectable()
export class UserController implements IUserController {

    constructor(){

    }

    async login(req: Request, res: Response){
        
    }
}