import multer from "multer";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware pour la gestion des upload unique
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const simpleUpladerMiddleware = (req, res, next) => {
  const uplader = req.app.locals.uploader;
  const singleFileUploader = uplader.single("image");

  singleFileUploader(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    } else if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }

    next();
  });
};

export default simpleUpladerMiddleware;
