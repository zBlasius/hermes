import { Container } from "inversify";
import TYPES from "./TYPES";
import { PostgresConnection, IDatabase } from "../../database/postgres/connection";

const DBcontainer = new Container();

DBcontainer.bind<IDatabase>(TYPES.PostgresConnection).to(PostgresConnection).inSingletonScope();

export { DBcontainer };
