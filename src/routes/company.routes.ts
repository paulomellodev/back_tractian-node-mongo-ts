import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  listCompanies,
  retrieveCompany,
  updateCompany,
} from "../controllers/companyController";
import ensureAuth from "../middlewares/auth";

const companyRouter = Router();

companyRouter.post("/create", createCompany);
companyRouter.get("/list", listCompanies);

companyRouter.use(ensureAuth);
companyRouter.put("/", updateCompany);
companyRouter.delete("/", deleteCompany);
companyRouter.get("/:company_id", retrieveCompany);

export default companyRouter;
