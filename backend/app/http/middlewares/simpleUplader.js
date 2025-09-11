import multer from "multer";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware pour la gestion des uploads unique
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
        error: "Error uploaded Multer: " + error.message,
      });
    } else if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error uploaded: " + error.message,
      });
    }

    next();
  });
};

export default simpleUpladerMiddleware;
