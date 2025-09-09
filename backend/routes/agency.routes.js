import express from "express";
import { getAll, show, store } from "../controllers/agency.controller.js";

const agencyRouter = express.Router();

agencyRouter.get("/", getAll);
agencyRouter.post("/store", store);
agencyRouter.get("/show/:id", show);

export default agencyRouter;
