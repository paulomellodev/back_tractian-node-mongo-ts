import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import AppErrors from "../errors";
import Company from "../models/Company";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
  });

  const { company_id } = req.params;

  const registeredCompany = await Company.findById(company_id);

  if (!registeredCompany) {
    throw new AppErrors("Company not found", 404);
  }

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  let { password } = req.body;

  const hashedPass = await hash(password, 10);

  const user = await User.create({
    ...req.body,
    password: hashedPass,
    company: company_id,
  });

  registeredCompany.users.push(user._id);

  registeredCompany.save();
  const { _id, name, email, company, createdAt, updatedAt, __v } = user;
  return res
    .status(201)
    .json({ _id, name, email, company, createdAt, updatedAt });
};

export const retrieveUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const user = await User.findById(user_id).populate("company", [
    "corporate_name",
    "cnpj",
  ]);
  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  return res.status(200).json(user);
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find().populate("company", [
    "corporate_name",
    "cnpj",
  ]);
  return res.status(200).json({ users });
};

export const updateUser = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
  });

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  let { password } = req.body;

  if (password) {
    const hashedPass = await hash(password, 10);
    req.body.password = hashedPass;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      ...req.body,
    },
    { new: true }
  );

  return res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppErrors("User not found", 404);
  }

  await user.deleteOne();

  return res.status(204).json();
};
