import multer from "multer";
import { StatusCodes } from "http-status-codes";

/**
 * Middlewrare pour la gestion des uploads multiples
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const multipleUploaderMiddleware = (req, res, next) => {
  const uploader = req.app.locals.uploader;
  const multipleUploader = uploader.array("images", 10);

  multipleUploader(req, res, (error) => {
    if (error instanceof multer.MulterError)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error uploaded Multer: " + error.message,
      });
    else if (error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error uploaded: " + error.message,
      });

    next();
  });
};

export default multipleUploaderMiddleware;
