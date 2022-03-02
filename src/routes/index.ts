import { Router } from "express";

import assetRouter from "./asset.routes";
import companyRouter from "./company.routes";
import sessionRouter from "./authentication.routes";
import unitRouter from "./unit.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/", sessionRouter);
routes.use("/company", companyRouter);
routes.use("/user", userRouter);
routes.use("/unit", unitRouter);
routes.use("/asset", assetRouter);

export default routes;
