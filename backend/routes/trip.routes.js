import express from "express";
import { getAll } from "../app/http/controllers/trip.controller.js";

const tripRouter = express.Router();

tripRouter.get("/", getAll);

export default tripRouter;
