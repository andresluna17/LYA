import { Request, Response } from "express";
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
