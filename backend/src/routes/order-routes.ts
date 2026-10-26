import { Router } from "express";
import { cancelOrder, getOrder, createOrder } from "../controller/order-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.post("/create",createOrder);