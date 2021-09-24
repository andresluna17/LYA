import redis, { ClientOpts } from "redis";
import JWTR from "jwt-redis";

const { REDIS_PORT = 6379, REDIS_HOST = "localhost" } = process.env;

export const REDIS_OPTIONS: ClientOpts = {
  port: +REDIS_PORT,
  host: REDIS_HOST
};

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
