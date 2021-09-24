import { Router } from "express";
import { createUser } from "./users.controller";

const router: Router = Router();

router.post("", createUser);
router.get("/:id");
router.put("/:id");
router.patch("/:id/active");

export { router as users };
