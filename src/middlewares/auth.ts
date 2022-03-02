import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import jwt from "../config/jwtAuth";
import AppErrors from "../errors";
import User from "../models/User";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppErrors("JWT Token is not provided", 401);
  }

  try {
    const [control, token] = authHeader.split(" ");
    const { secret } = jwt;

    if (control !== "Bearer") {
      throw new AppErrors("Authorization sended in a wrong way.", 400);
    }

    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    const user = await User.findById(sub);

    if (!user) {
      throw new AppErrors("Invalid JWT", 400);
    }

    request.user = {
      id: user._id,
    };

    request.company = {
      id: user.company,
    };

    return next();
  } catch (err) {
    throw new AppErrors("JWT Expired or sended in a wrong way", 401);
  }
}
