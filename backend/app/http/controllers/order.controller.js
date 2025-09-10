import { StatusCodes } from "http-status-codes";
import Order from "../../models/Order.js";

//endpoint pour le front :
//Checker l'authentification plus tard
export const getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate("trip");
    return res.status(StatusCodes.OK).json({
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while fetching orders: ${error.message}`,
    });
  }
};
