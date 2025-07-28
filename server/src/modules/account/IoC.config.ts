import { Container } from "inversify";
import { TYPES } from "./utils";
import * as repository from "./architeture";
import * as service from "./domain";
import * as controller from "./application/";
import { DBcontainer } from "../../../src/shared/container/IoC.config";


const container = new Container();
container.parent = DBcontainer;

// Architeture
container
  .bind<repository.IUserRepository>(TYPES.UserRepository)
  .to(repository.UserRepository);

// Domain
container.bind<service.IUserService>(TYPES.UserService).to(service.UserService);

// Application
container
  .bind<controller.IUserController>(TYPES.UserController)
  .to(controller.UserController);


export default container;
