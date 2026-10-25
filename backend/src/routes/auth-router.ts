import { Router } from "express";

import { signin , signup } from "../controller/auth-controller";

export const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);