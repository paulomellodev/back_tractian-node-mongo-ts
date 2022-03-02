import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import Company from "../models/Company";
import Asset from "../models/Asset";
import Unit from "../models/Unit";

import AppErrors from "../errors";

export const createAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    asset_name: yup.string().required(),
    image: yup.string().required(),
    model: yup.string().required(),
    description: yup.string().required(),
    status: yup
      .string()
      .oneOf(["Running", "Alerting", "Stopped"])
      .default(() => "Stopped"),
    health_level: yup
      .number()
      .min(0)
      .max(100)
      .default(() => 100),
  });

  const { unit_id } = req.params;
  const unit = await Unit.findById(unit_id);

  if (!unit) {
    throw new AppErrors("Unit not found", 404);
  }

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  const company = await Company.findById(req.company.id);

  if (!company?.units.includes(unit._id)) {
    throw new AppErrors("Unit does not make part of your company", 403);
  }

  const asset = await Asset.create({
    ...req.body,
    owner: req.user.id,
    unit: unit._id,
  });

  unit.assets.push(asset._id);

  await unit.save();

  return res.status(201).json(asset);
};

export const retrieveAsset = async (req: Request, res: Response) => {
  const { asset_id } = req.params;

  const asset = await Asset.findById(asset_id)
    .populate("owner", ["name", "email"])
    .populate("unit");

  if (!asset) {
    throw new AppErrors("Asset not found", 404);
  }

  return res.status(200).json(asset);
};

export const listAssets = async (req: Request, res: Response) => {
  const assets = await Asset.find();
  return res.status(200).json({ assets });
};

export const updateAsset = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    asset_name: yup.string(),
    image: yup.string(),
    model: yup.string(),
    description: yup.string(),
    status: yup
      .string()
      .oneOf(["Running", "Alerting", "Stopped"])
      .default(() => "Stopped"),
    health_level: yup
      .number()
      .min(0)
      .max(100)
      .default(() => 100),
  });

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  const { asset_id } = req.params;

  const asset = await Asset.findById(asset_id);
  if (!asset) {
    throw new AppErrors("Asset not found", 404);
  }

  const company = await Company.findById(req.company.id);

  if (!company?.units.includes(asset.unit)) {
    throw new AppErrors(
      "Users can only update Assets from units which are part of the company",
      403
    );
  }

  const updatedAsset = await Asset.findByIdAndUpdate(
    asset_id,
    {
      ...req.body,
    },
    { new: true }
  );

  return res.status(200).json(updatedAsset);
};

export const deleteAsset = async (req: Request, res: Response) => {
  const { asset_id } = req.params;

  const asset = await Asset.findById(asset_id);
  if (!asset) {
    throw new AppErrors("Asset not found", 404);
  }

  const company = await Company.findById(req.company.id);

  if (!company?.units.includes(asset.unit)) {
    throw new AppErrors(
      "Users can only remove Assets from units which are part of the their company",
      403
    );
  }

  await Asset.findByIdAndRemove(asset_id);

  return res.status(200).json();
};
