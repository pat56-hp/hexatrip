import express from "express";
import { getAll, show, store } from "../controllers/adviser.controller.js";

const adviserRouter = express.Router();

//Endpoint pour le front :

adviserRouter.get("/", getAll);
adviserRouter.post("/store", store);
adviserRouter.get("/show/:id", show);

export default adviserRouter;
