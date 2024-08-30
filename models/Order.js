// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  foodItems: {
    type: [String], // List of food item names
    required: true,
  },
  quantities: {
    type: [Number], // List of quantities corresponding to the food items
    required: true,
  },
  totalPrice: {
    type: Number, // Total price of the order
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now, // Automatically set the order date to the current date
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
