import { StatusCodes } from "http-status-codes";

const authorizeMiddleware =
  (accessGrantedRole = []) =>
  (req, res, next) => {
    if (accessGrantedRole.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Access refused",
      });
    }
    next();
  };

export default authorizeMiddleware;
