// BACKEND CODE (Node.js/Express)

// Import required modules
import express from "express";
import { connect } from "mongoose";
import path from "path";
import Order from "./models/Order.js"; // Import the Order model
import { fileURLToPath } from "url";
import cors from "cors"; // Import CORS

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Enable CORS to allow frontend (port 5500) to communicate with backend (port 3000)
app.use(cors());

// Connect to MongoDB
connect(
  "mongodb+srv://nidhik:1234@cluster0.kmggw.mongodb.net/orders?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files (index.html is assumed to be in the root directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to handle orders
app.post("/place-order", async (req, res) => {
  try {
    const { foodItems, quantities, totalPrice } = req.body;

    console.log("Received data:", req.body); // Add this line to debug

    // Create a new order
    const newOrder = new Order({
      foodItems,
      quantities,
      totalPrice,
    });

    // Save to the database
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
