import express from "express";
import { getAll } from "../app/http/controllers/order.controller.js";

const orderRouter = express.Router();

//endpoint pour le front :
//Checker l'authentification plus tard
orderRouter.get("/", getAll);

export default orderRouter;
