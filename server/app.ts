import express, { Application } from "express";
//import session from "express-session";
import path from "path";
import cors from "cors";
import BaseRouter from "./src/routes"
import 'dotenv/config';

// import 'dotenv/config'
const PORT = process.env.PORT || 8080;

// declare module "express-session" { 
//   interface SessionData {
//     user: {
//       userId: string;
//       fullName: string;
//       email: string;
//       password: string;
//       type: string;
//     };
//   }
// }

export class App {
  database = new Object();
  express: Application;

  constructor() {
    this.express = express();
    // this.database.connect();
    // this.session();
    this.middleware();
    this.routes();
    this.listen();
  }

  // private session() {
  //   this.express.use(
  //     session({
  //       secret: "mySecretKey",
  //       resave: true,
  //       saveUninitialized: true,
  //       cookie: { secure: true },
  //     })
  //   );
  // }

  private middleware(): void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(
      cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    );
  }

  private routes(): void { 
    this.express.use("/api", BaseRouter);
  }

  private listen() {
    this.express.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}
