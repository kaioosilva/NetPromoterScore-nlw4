import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import createConnection from "./database";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();
const app = express();

//Inform we're using JSON format.
app.use(express.json());
app.use(router);

//This is a middleware to handle the erros in the whole APP.
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
