import { Router } from "express";
import authController from "../controllers/sessionController";

const sessionRouter = Router();

sessionRouter.post("/signin", authController);

export default sessionRouter;
