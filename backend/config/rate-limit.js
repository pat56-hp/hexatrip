import { StatusCodes } from "http-status-codes";

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, //15 min
  max: 100, //Maximum de requete
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: "Too Many Requests",
    });
  },
  standardHeaders: true, // Inclure dans le rate limit dans le header de la requete
  legacyHeaders: false, //
};

export default rateLimitOptions;
