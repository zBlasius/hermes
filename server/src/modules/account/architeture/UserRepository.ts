import { injectable } from "inversify";
import { IUserRepository } from "./contracts/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository{
    constructor() {}

    async get() {
        console.log("login");
    }

}