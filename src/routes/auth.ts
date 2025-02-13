import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login );


