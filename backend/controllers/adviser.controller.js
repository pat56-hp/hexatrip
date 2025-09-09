import { StatusCodes } from "http-status-codes";
import Adviser from "../models/Adviser.js";

//endpoint pour le front :

//Get All advisers
export const getAll = async (req, res) => {
  try {
    const params = req.query;

    //filter by query params
    let formattedParams = {};
    if (params.town) {
      formattedParams.tags = { $regex: params.town, $options: "i" };
    }

    //get all advisers
    const advisers = await Adviser.find(formattedParams);
    return res.status(StatusCodes.OK).json({
      data: advisers,
      message: "Advisers fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching advisers:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while fetching advisers: ${error.message}`,
    });
  }
};

//Store a new adviser
export const store = async (req, res) => {
  const body = req.body;
  if (!body?.name || !body) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Name is required" });
  }

  try {
    await Adviser.create(req.body);
    return res.status(StatusCodes.CREATED).json({ message: "Adviser created" });
  } catch (error) {
    console.error("Error creating adviser:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while creating the adviser: ${error.message}`,
    });
  }
};

//Show an adviser
export const show = async (req, res) => {
  try {
    const param = req.params.id;

    const adviser = await Adviser.findById(param);
    if (!adviser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Adviser not found" });
    }

    return res.status(StatusCodes.OK).json({
      data: adviser,
      message: "Adviser fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching adviser:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while fetching the adviser: ${error.message}`,
    });
  }
};
