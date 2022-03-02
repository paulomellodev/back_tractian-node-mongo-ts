import { Router } from "express";
import {
  createUser,
  deleteUser,
  listUsers,
  retrieveUser,
  updateUser,
} from "../controllers/userController";
import ensureAuth from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/signup/:company_id", createUser);
userRouter.get("/", listUsers);

userRouter.use(ensureAuth);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);
userRouter.get("/:user_id", retrieveUser);

export default userRouter;
