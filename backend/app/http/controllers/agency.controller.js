import { StatusCodes } from "http-status-codes";
import Agency from "../../models/Agency.js";

//Get all agencies
export const getAll = async (req, res) => {
  try {
    const agencies = await Agency.find({});
    return res.status(StatusCodes.OK).json({
      data: agencies,
      message: "Agencies fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching agencies" });
  }
};

//Store a new agency
export const store = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Body is empty" });
  }

  try {
    const newAgency = await Agency.create(body);
    return res.status(StatusCodes.CREATED).json({
      data: newAgency,
      message: "Agency created successfully",
    });
  } catch (error) {
    console.error("Error creation agency:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creation agency" });
  }
};

//Show a single agency by ID
export const show = async (req, res) => {
  const { id } = req.params;

  try {
    const agency = await Agency.findById(id);
    if (!agency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Agency not found" });
    }

    return res.status(StatusCodes.OK).json({
      data: agency,
      message: "Agency fetched successfully",
    });
  } catch (error) {
    console.error("Error getting agency:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting agency" });
  }
};
