import express, { Application, NextFunction, Request, Response } from "express";
//import session from "express-session";
import path from "path";
import cors from "cors";
import BaseRouter from "./src/routes"
import 'dotenv/config';
import { AppError } from "./src/shared/errors/AppError";

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
    this.errorHandling();
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

  private errorHandling(): void {
    // Error handling middleware must be placed after all other middleware and routes
    console.log('entrou aqui 5')
    this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log('Error caught in middleware:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        isAppError: err instanceof AppError
      });

      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
    
      // fallback for unexpected errors
      console.error('Unexpected error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    });
  }

  private listen() {
    this.express.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}
