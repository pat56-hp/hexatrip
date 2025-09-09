import mongoose from "mongoose";
import Trip from "./Trip.js";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    trip: { type: mongoose.Types.ObjectId, ref: Trip },
    quantity: { type: Number },
    adults: { type: Number },
    firstname: { type: String },
    familyname: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    zip: { type: String },
    town: { type: String },
    country: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
