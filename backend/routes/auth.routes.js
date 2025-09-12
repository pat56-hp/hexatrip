import express from "express";
import { login, register } from "../app/http/controllers/auth.controller.js";
import validateRegister from "../app/http/middlewares/registerValidator.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", login);

export default authRouter;
