import { StatusCodes } from "http-status-codes";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

/**
 * Get User profile data
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getProfile = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    data: req.user,
    message: "Profile data",
  });
};

/**
 * Update User profile
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateProfile = async (req, res) => {
  try {
    const userLogged = req.user;
    const body = req.body;

    //On verifie si body est renseigné
    if (!body || !body?.userName || !body?.email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Aucune donnée renseignée",
      });
    }

    //On hash le password s'il est dans le body
    if (body.password) {
      const hashPassword = await bcrypt.hash(body.password, 10);
      body.password = hashPassword;
    }

    //On recupere l'utilisateur connecté & on le modifie
    await User.findByIdAndUpdate(userLogged._id, body);

    return res.status(StatusCodes.OK).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred during updating : " + error.message,
    });
  }
};
