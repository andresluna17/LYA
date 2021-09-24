import express, { Application } from "express";
import morgan from "morgan";
import { auth } from "./modules/auth/router";
import { users } from "./modules/users/router";

export const createApp = () => {
  const app: Application = express();
  app.use(express.json());
  if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

  app.use("/users", users);
  app.use("/authorization", auth);

  return app;
};
