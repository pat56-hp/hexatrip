import express from "express";
import {
  getAll,
  show,
  store,
  update,
} from "../app/http/controllers/adviser.controller.js";
import simpleUpladerMiddleware from "../app/http/middlewares/simpleUplader.js";
const adviserRouter = express.Router();

//Endpoint pour le front :

adviserRouter.get("/", getAll);
adviserRouter.post("/store", store);
adviserRouter.get("/show/:id", show);
adviserRouter.patch("/update/:id", simpleUpladerMiddleware, update);

export default adviserRouter;
