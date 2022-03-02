import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import AppErrors from "../errors";
import Company from "../models/Company";
import Unit from "../models/Unit";

export const createUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    unit_name: yup.string().required(),
    address: yup.string(),
  });

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });
  const company = await Company.findById(req.company.id);
  if (!company) {
    throw new AppErrors("Company not found", 404);
  }

  const unit = await Unit.create({ ...req.body, company: company._id });

  company?.units.push(unit._id);

  await company.save();

  return res.status(201).json(unit);
};

export const retrieveUnit = async (req: Request, res: Response) => {
  const { unit_id } = req.params;

  const unit = await Unit.findById(unit_id)
    .populate("company", "corporate_name")
    .populate("assets");
  if (!unit) {
    throw new AppErrors("Unit not found", 404);
  }

  return res.status(200).json(unit);
};

export const listUnits = async (req: Request, res: Response) => {
  const units = await Unit.find();
  return res.status(200).json({ units });
};

export const updateUnit = async (req: Request, res: Response) => {
  const { unit_id } = req.params;
  const unit = await Unit.findById(unit_id);

  if (!unit) {
    throw new AppErrors("Unit not found", 404);
  }

  const company = await Company.findById(req.company.id);

  if (!company?.units.includes(unit._id)) {
    throw new AppErrors(
      "Users can only update units from company they are part of",
      403
    );
  }

  const updatedUnit = await Unit.findByIdAndUpdate(
    unit_id,
    {
      ...req.body,
    },
    { new: true }
  );

  return res.status(200).json(updatedUnit);
};

export const deleteUnit = async (req: Request, res: Response) => {
  const { unit_id } = req.params;

  const unit = await Unit.findById(unit_id);

  if (!unit) {
    throw new AppErrors("Unit not found", 404);
  }

  const company = await Company.findById(req.company.id);

  if (!company?.units.includes(unit._id)) {
    throw new AppErrors(
      "Users can only remove units from company they are part of",
      403
    );
  }

  await Unit.findByIdAndRemove(unit_id);

  return res.status(200).json();
};
