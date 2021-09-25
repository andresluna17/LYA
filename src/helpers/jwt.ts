import redis from "redis";
import JWTR from "jwt-redis";
import { REDIS_OPTIONS } from "../config/cache";

let redisClient = redis.createClient(REDIS_OPTIONS);
let jwtr = new JWTR(redisClient);

export const createToken = async (userId: string) => {
  return await jwtr.sign({ jti: userId }, (process.env.ACCESS_TOKEN = "secret"), {
    expiresIn: 60 * 60
  });
};

export const destroyToken = async (userId: string) => {
  return await jwtr.destroy(userId);
};

export const verifyToken = async (userId: string) => {
  return await jwtr.verify(userId, (process.env.ACCESS_TOKEN = "secret"));
};
