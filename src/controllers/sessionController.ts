import { Request, Response } from "express";
import * as yup from "yup";
import AppErrors from "../errors";
import authService from "../services/authServices";

export const authController = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  await schema.validate(req.body, { abortEarly: false }).catch(({ errors }) => {
    throw new AppErrors(errors);
  });

  const auhenticatedUser = await authService({ ...req.body });

  return res.status(200).json(auhenticatedUser);
};

export default authController;
