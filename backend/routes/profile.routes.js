import express from "express";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "../app/http/controllers/profile.controller.js";
import authenticateMiddleware from "../app/http/middlewares/authenticate.js";

const profileRouter = express.Router();

profileRouter.get("/", authenticateMiddleware, getProfile);
profileRouter.patch("/update", authenticateMiddleware, updateProfile);
profileRouter.delete("/", authenticateMiddleware, deleteProfile);

export default profileRouter;
