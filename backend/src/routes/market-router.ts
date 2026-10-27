import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { getDepth } from "../controller/market-controller";

export const marketRouter = Router();

marketRouter.use(authMiddleware);

marketRouter.post("/depth" , getDepth);
