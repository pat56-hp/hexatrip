import express from "express";
import {
  login,
  logout,
  register,
} from "../app/http/controllers/auth.controller.js";
import validateRegister from "../app/http/middlewares/registerValidator.js";
import authenticateMiddleware from "../app/http/middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticateMiddleware, logout);

export default authRouter;
