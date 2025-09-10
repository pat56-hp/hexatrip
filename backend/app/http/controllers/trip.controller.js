import { StatusCodes } from "http-status-codes";
import Trip from "../../models/Trip.js";

//Recuperation de tous les trip
export const getAll = async (req, res) => {
  try {
    const trips = await Trip.find({});
    return res.status(StatusCodes.OK).json({
      data: trips,
      message: "Fetch data of trips successfully",
    });
  } catch (error) {
    console.error("Failed to fetch datas of trip: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch data trip : " + error.message,
    });
  }
};

export const update = async (req, res) => {};

export const show = async (req, res) => {};

export const deleteOne = async (req, res) => {};

export const deleteAll = async (req, res) => {};
