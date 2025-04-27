import { Container } from "inversify";
import { TYPES } from "./utils"
import * as repository from "./architeture"
import * as service from "./domain"
import * as controller from "./application/"
import { connection } from "../../database/mysql/connection";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

const container = new Container();

// Architeture
container
    .bind<repository.IUserRepository>(TYPES.UserRepository)
    .to(repository.UserRepository);

// Domain
container
    .bind<service.IUserService>(TYPES.UserService)
    .to(service.UserService);

// Application
container
    .bind<controller.IUserController>(TYPES.UserController)
    .to(controller.UserController);

// Database
container
    .bind<Pool>("database")
    .toConstantValue(connection)

export default container;