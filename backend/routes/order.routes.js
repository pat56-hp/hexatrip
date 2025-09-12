import express from "express";
import { getAll } from "../app/http/controllers/order.controller.js";
import authenticateMiddleware from "../app/http/middlewares/authenticate.js";

const orderRouter = express.Router();

//endpoint pour le front :
//Checker l'authentification plus tard
orderRouter.get("/", authenticateMiddleware, getAll);

export default orderRouter;
