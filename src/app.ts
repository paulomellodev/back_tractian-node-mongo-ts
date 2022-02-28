import "express-async-errors";
import express, { json, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import AppErrors from "./errors";
import connection from "./database";
import { MongooseError } from "mongoose";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof AppErrors) {
      return response.status(err.status).json({
        error: err.message,
      });
    }
    return response.status(400).json({
      error: err.message,
    });
  }
);

connection()
  .then(() => {
    console.log("Database connected!");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err: MongooseError) => {
    throw new AppErrors(err.name, 400);
  });

export default app;
