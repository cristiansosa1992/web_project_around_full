import { Router } from "express";
import cardsRouter from "./cards.js";
import usersRouter from "./users.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

export default router;
