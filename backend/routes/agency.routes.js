import express from "express";
import {
  getAll,
  show,
  store,
  update,
} from "../app/http/controllers/agency.controller.js";

const agencyRouter = express.Router();

agencyRouter.get("/", getAll);
agencyRouter.post("/store", store);
agencyRouter.patch("/update/:id", update);
agencyRouter.get("/show/:id", show);

export default agencyRouter;
