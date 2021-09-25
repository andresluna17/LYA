import { AuthRequest } from "../../interfaces/auth.interface";
import { Response } from "express";
import axios from "axios";
import mqtt from "../../helpers/mqtt";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  let dato_curioso = (
    await axios.get("https://catfact.ninja/fact?max_length=140", {
      headers: { "Content-Type": "application/json" }
    })
  ).data.fact;
  mqtt.publish(
    `lyatest/${(process.env.MQTT_CODE = "")}`,
    JSON.stringify({
      message: dato_curioso,
      user: req.user?._id
    })
  );
  return res.status(200).send({ status: true, message: "menesaje enviado" });
};
