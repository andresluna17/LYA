import { Request } from "express";
import { UserDocument } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: UserDocument;
}
