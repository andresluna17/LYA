import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { sendMessage } from "./message.controller";
const router: Router = Router();

router.post("/send", authMiddleware, sendMessage);

export { router as message };
