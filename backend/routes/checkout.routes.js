import express from "express";
import { createStripeSession } from "../app/http/controllers/checkout.controller.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", createStripeSession);

export default checkoutRouter;
