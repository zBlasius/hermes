import { injectable } from "inversify";
import { IUserService } from "./contracts/IUserService";

@injectable()
export class UserService implements IUserService {

    constructor() {}
   
    async login() {
        console.log("login");
    }
}