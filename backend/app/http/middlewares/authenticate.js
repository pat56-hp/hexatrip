import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//Authenticate middleware
const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //Verification du token
    const jwtScretKey = process.env.JWT_SECRET_KEY;
    const userByToken = jwt.verify(token, jwtScretKey);
    if (!userByToken) {
      throw new Error("Autentication failed");
    }

    //recuperation de l'utilisateur connecté
    const user = await User.findById(userByToken.id).select(
      "-password -__v -updatedAt"
    );
    req.user = user; //attache de l'utilisateur dans la requete
    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "An error occurred : " + error.message,
    });
  }
};

export default authenticateMiddleware;
