import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectToDatabase from "./config/database.js";

//Routes
import orderRouter from "./routes/order.routes.js";
import adviserRouter from "./routes/adviser.routes.js";
import agencyRouter from "./routes/agency.routes.js";
import tripRouter from "./routes/trip.routes.js";

/************************* Init App **********************/
const app = express();

/************************* Config **********************/
const PORT = 3000;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/************************* Connexion to Database **********************/
connectToDatabase();

/************************* Endpoints **********************/
app.use("/orders", orderRouter);
app.use("/advisers", adviserRouter);
app.use("/agencies", agencyRouter);
app.use("/trips", tripRouter);

//Capture des urls indefinies
app.use((req, res) => {
  return res.status(404).send("404 not found");
});

/************************* Ecoute du server lancé **********************/
app.listen(PORT, () => {
  console.log(`Hexatrip API server running on port ${PORT}`);
});
