import { compare } from "bcryptjs";
import jwt from "../config/jwtAuth";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import AppErrors from "../errors";
import { Types } from "mongoose";

interface Request {
  email: string;
  password: string;
}

interface UserResponse {
  _id: Types.ObjectId;
  name: string;
  email: string;
  company: object;
  updatedAt: Date;
  createdAt: Date;
}

interface Response {
  token: string;
  user: UserResponse;
}

const authService = async ({ email, password }: Request): Promise<Response> => {
  const user = await User.findOne({ email })
    .select("+password")
    .populate("company", "corporate_name");

  if (!user) {
    throw new AppErrors("Incorrect email", 401);
  }
  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppErrors("Incorrect email / password combination", 401);
  }

  const { expiresIn, secret } = jwt;

  if (!secret) {
    throw new AppErrors("Internal Server Error", 500);
  }

  const token = sign({ sub: user._id }, secret, {
    expiresIn: expiresIn,
  });
  const serializedUSer: UserResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    company: user.company,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: serializedUSer, token };
};

export default authService;
