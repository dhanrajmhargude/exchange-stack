import { Router } from "express";
import { getBalance } from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.post("/balance");