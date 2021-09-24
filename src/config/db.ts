const {
  MONGO_HOST = "localhost",
  MONGO_PORT = 27017,
  MONGO_DATABASE = "lya"
} = process.env;

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
