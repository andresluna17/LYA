import { Request, Response } from "express";
import { AuthRequest } from "../../interfaces/auth.interface";
import { User, UserDocument } from "../../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    let data: UserDocument = req.body;
    let foundUser = await User.findOne({ email: data.email });
    if (foundUser)
      return res
        .status(403)
        .send({ status: false, message: "Email del usuario ya existe" });
    let newUser = new User(data);
    await newUser.save();
    return res.status(200).send({
      status: true,
      message: "Usuario Creado Exitosamente",
      data: {
        id: newUser._id
      }
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error Al Crear el Usuario", error });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    let data: UserDocument = req.body;
    let updateUser = await User.findById(req.params.id);
    if (!updateUser)
      return res.status(404).send({ status: false, message: "Usuario no encontrado" });
    updateUser!.email = data.email;
    updateUser!.password = data.password;
    updateUser!.name = data.name;
    await updateUser?.save();
    return res.status(200).send({
      status: true,
      data: updateUser,
      message: "Usuario actualizado Exitosamente"
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      error,
      message: "Error al actulizar el usuario"
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id);
    if (!user)
      return res.status(404).send({ status: false, message: "Usuario no encontrado" });
    if (user)
      return res
        .status(200)
        .send({ status: true, message: "Usuario eliminado exitosamente" });
    return res
      .status(500)
      .send({ status: false, message: "No se pudo eliminar el usuario" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error al eliminar el usuario", error });
  }
};

export const activeUSer = async (req: AuthRequest, res: Response) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({ status: false, message: "Usuario no encontrado" });
    user.active = true;
    await user.save();
    return res
      .status(200)
      .send({ status: true, message: "El usuario a sido activado", data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error al activar el usuario", error });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  let user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send({ status: false, message: "Usuario no encontrado" });
  if (!user.active)
    return res.status(403).send({ status: false, message: "Usuario inactivo" });
  return res.status(200).send({ status: true, message: "Usuario listado", data: user });
};
