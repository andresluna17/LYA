import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { login, logout } from "./auth.controller";

const router: Router = Router();

router.post("", login);
router.delete("", authMiddleware, logout);

export { router as auth };
