import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  listCompanies,
  retrieveCompany,
  updateCompany,
} from "../controllers/companyController";

const companyRouter = Router();

companyRouter.post("/create", createCompany);
companyRouter.get("/list", listCompanies);
companyRouter.get("/:company_id", retrieveCompany);
companyRouter.put("/:company_id", updateCompany);
companyRouter.delete("/:company_id", deleteCompany);

export default companyRouter;
