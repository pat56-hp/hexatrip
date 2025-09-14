import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectToDatabase from "./config/database.js";
import multer from "multer";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Routes
import orderRouter from "./routes/order.routes.js";
import adviserRouter from "./routes/adviser.routes.js";
import agencyRouter from "./routes/agency.routes.js";
import tripRouter from "./routes/trip.routes.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";

/************************* Init App **********************/
const app = express();

/************************* Config **********************/
const PORT = 3000;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public")); //Gestion des fichiers statics
dotenv.config();
app.use(cookieParser());

//Connexion to Database
connectToDatabase();

//Config Multer
app.locals.uploader = multer({
  storage: multer.memoryStorage({}), // Storage at endpoint
  limits: { fieldSize: 10 * 1024 * 1024 }, //Max Size 10 Mb
  fileFilter: (req, file, cb) => {
    //Accept only image
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are accepted"));
  },
});

/************************* Endpoints **********************/
app.use("/orders", orderRouter);
app.use("/advisers", adviserRouter);
app.use("/agencies", agencyRouter);
app.use("/trips", tripRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("create-checkout-order", checkoutRouter);

//Capture des urls indefinies
app.use((req, res) => {
  return res.status(404).send("404 not found");
});

/************************* Ecoute du server lancé **********************/
app.listen(PORT, () => {
  console.log(`Hexatrip API server running on port ${PORT}`);
});
