import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  activeUSer,
  createUser,
  deleteUser,
  getUserById,
  updateUser
} from "./users.controller";

const router: Router = Router();

router.post("", createUser);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.patch("/:id/active", authMiddleware, activeUSer);

export { router as users };
