import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express, { json, NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";

import connection from "./database";
import routes from "./routes";
import AppErrors from "./errors";

const app = express();

app.use(json());

app.use(cors());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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
