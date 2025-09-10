import express from "express";
import {
  deleteAll,
  deleteOne,
  getAll,
  getAllBestsellers,
  show,
  store,
  update,
} from "../app/http/controllers/trip.controller.js";

const tripRouter = express.Router();

tripRouter.get("/", getAll);
tripRouter.get("/bestsellers", getAllBestsellers);
tripRouter.post("/store", store);
tripRouter.patch("/update/:id", update);
tripRouter.get("/show/:id", show);
tripRouter.delete("/delete/:id", deleteOne);
tripRouter.delete("/delete-all", deleteAll);

export default tripRouter;
