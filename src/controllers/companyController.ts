import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import AppErrors from "../errors";
import Company from "../models/Company";

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    corporate_name: yup.string().required(),
    cnpj: yup.string().min(14).max(14).required(),
    description: yup.string(),
  });

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  const company = await Company.create(req.body);
  return res.status(201).json(company);
};

export const retrieveCompany = async (req: Request, res: Response) => {
  const { company_id } = req.params;

  const company = await Company.findById(company_id);
  if (!company) {
    throw new AppErrors("Company not found", 404);
  }

  return res.status(200).json(company);
};

export const listCompanies = async (req: Request, res: Response) => {
  const companies = await Company.find();
  return res.status(200).json(companies);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { company_id } = req.params;
  if (!(await Company.findById(company_id))) {
    throw new AppErrors("Company not found", 404);
  }
  const company = await Company.findByIdAndUpdate(company_id, {
    ...req.body,
  });

  return res.status(200).json(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { company_id } = req.params;

  const company = await Company.findById(company_id);

  if (!company) {
    throw new AppErrors("Company not found", 404);
  }

  await company.deleteOne();

  return res.status(200).json();
};
