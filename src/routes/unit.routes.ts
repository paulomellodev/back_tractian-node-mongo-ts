import { Router } from "express";

import {
  createUnit,
  deleteUnit,
  listUnits,
  retrieveUnit,
  updateUnit,
} from "../controllers/unitController";
import ensureAuth from "../middlewares/auth";

const unitRouter = Router();

unitRouter.use(ensureAuth);
unitRouter.post("/create", createUnit);
unitRouter.get("/", listUnits);
unitRouter.get("/:unit_id", retrieveUnit);
unitRouter.put("/:unit_id", updateUnit);
unitRouter.delete("/:unit_id", deleteUnit);

export default unitRouter;
