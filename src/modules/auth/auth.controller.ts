import { Request, Response } from "express";
import { createToken, destroyToken } from "../../helpers/jwt";
import { AuthRequest } from "../../interfaces/auth.interface";
import { User } from "../../models/user.model";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let foundUser = await User.findOne({ email });
  if (!foundUser || !(await foundUser?.matchesPassword(password)))
    return res.status(404).send({ status: false, message: "Credenciales invalidas" });
  if (!foundUser.active)
    return res.status(404).send({ status: false, message: "Usuario inactivo" });
  let token = await createToken(foundUser._id);
  return res.status(200).send({ status: true, message: "Autheticado", data: { token } });
};

export const logout = async (req: AuthRequest, res: Response) => {
  let tokendestroy = await destroyToken(req.user?._id);
  if (tokendestroy)
    return res.status(200).send({ status: true, message: "Logout exitoso" });
  return res.status(401).send({ status: false, message: "Error en Logout" });
};
