import { Router } from "express";
import companyRouter from "./company.routes";

const routes = Router();

routes.use("/company", companyRouter);

export default routes;
