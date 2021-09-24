import { Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";
import { AuthRequest } from "../interfaces/auth.interface";
import { User } from "../models/user.model";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  let verify = await verifyToken(token!).catch(() => false);
  if (!verify) return res.status(400).send({ status: false, message: "No Autorizado" });
  let user = await User.findOne({ _id: verify == true ? "" : verify.jti });
  req.user = user!;
  return next();
};
