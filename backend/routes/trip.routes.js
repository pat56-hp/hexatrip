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
import multipleUploaderMiddleware from "../app/http/middlewares/multipleUploader.js";
import authenticateMiddleware from "../app/http/middlewares/authenticate.js";
import authorizeMiddleware from "../app/http/middlewares/authorize.js";

const tripRouter = express.Router();

tripRouter.get("/", getAll);
tripRouter.get("/bestsellers", getAllBestsellers);
tripRouter.post("/store", store);
tripRouter.patch("/update/:id", multipleUploaderMiddleware, update);
tripRouter.get("/show/:id", show);
tripRouter.delete("/delete/:id", deleteOne);
tripRouter.delete(
  "/delete-all",
  authenticateMiddleware,
  authorizeMiddleware(["admin"]),
  deleteAll
);

export default tripRouter;
