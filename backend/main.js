import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectToDatabase from "./database.js";

//Routes
import orderRouter from "./routes/order.routes.js";
import adviserRouter from "./routes/adviser.routes.js";
import agencyRouter from "./routes/agency.routes.js";

/************************* Config **********************/
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

//Capture des urls indefinies
app.use((req, res) => {
  return res.status(404).send("404 not found");
});

/************************* Ecoute du server lancé **********************/
app.listen(PORT, () => {
  console.log(`Hexatrip API server running on port ${PORT}`);
});
