import { Router } from "express";

import {
  createUser,
  getCurrentUser,
  getUserById,
  getUsers,
  updateCurrentUser,
  updateCurrentUserAvatar,
} from "../controllers/users.js";

const router = Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);
router.patch("/me/avatar", updateCurrentUserAvatar);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;