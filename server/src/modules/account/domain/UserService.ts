import { injectable } from "inversify";
import { IUserService, SignUpData, UserResponse } from "./contracts/IUserService";
import { LoginData } from "./contracts/IUserService";
@injectable()
export class UserService implements IUserService {

    constructor() {}
   
    async login(info: LoginData): Promise<UserResponse> {
        console.log("login", info);
        return {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            token: "1234567890"
        };
    }

    async signup(info: SignUpData): Promise<UserResponse> {
        console.log("signup", info);
        return {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            token: "1234567890"
        };
    }
}