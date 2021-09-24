import mongoose from "mongoose";
import { createApp } from "./app";
import { MONGO_URI } from "./config/db";

(async () => {
  await mongoose.connect(MONGO_URI).then(() => console.log(`connect with DB`));

  const app = createApp();

  app.listen((process.env.APP_PORT = "3000"), () =>
    console.log(`server on port ${(process.env.APP_PORT = "3000")}`)
  );
})();
