import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

//Register form validation
const validateRegister = [
  body("username")
    .isAlphanumeric()
    .withMessage("must be alphanumeric")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be min 3 characters and max 30"),
  body("email").isEmail().withMessage("Should be a correct email"),
  body("password").isLength({ min: 4 }).withMessage("At least 4 characters"),
  (req, res, next) => {
    const errors = validationResult[req];
    if (!errors.isEmpty()) {
      return res.status(StatusCodes).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validateRegister;
