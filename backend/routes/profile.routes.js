import express from "express";
import {
  getProfile,
  updateProfile,
} from "../app/http/controllers/profile.controller.js";
import authenticateMiddleware from "../app/http/middlewares/authenticate.js";

const profileRouter = express.Router();

profileRouter.get("/", authenticateMiddleware, getProfile);
profileRouter.put("/update", authenticateMiddleware, updateProfile);

export default profileRouter;
