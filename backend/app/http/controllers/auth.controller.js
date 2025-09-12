import { StatusCodes } from "http-status-codes";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
/**
 * Register User
 * @param {*} req
 * @param {*} res
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //On verifie si l'un des champs est manquant
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Missing field(s)",
      });
    }

    //On verifie si l'utilisateur existe deja
    if (await User.findOne({ email })) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "You are already registered",
      });
    }

    //Hash du password
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    //Create User
    const user = await User.create({
      userName: username,
      email: email,
      password: passwordHashed,
    });

    return res.status(StatusCodes.CREATED).json({
      data: user,
      message: "User registered",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred during registration : " + error.message,
    });
  }
};

/**
 * Login User
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Missing field(s)",
      });
    }

    //On check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }

    //Creation du token d'authentification
    const jwtScretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
        username: user.userName,
        email: user.email,
      },
      jwtScretKey,
      { expiresIn: "1h" }
    );

    // strip user from password
    const {
      password: _,
      __v,
      updatedAt,
      ...userWithoutSentivieData
    } = user._doc;

    return res.status(StatusCodes.OK).json({
      data: userWithoutSentivieData,
      token,
      message: "Login accepted",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred during login : " + error.message,
    });
  }
};
