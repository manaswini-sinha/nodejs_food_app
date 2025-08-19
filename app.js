const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 4000; 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // ✅ Serve frontend files

// Food Menu
let foods = [
  { id: 1, name: "Pizza", price: 250 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 180 },
  { id: 4, name: "Momos", price: 100 }
];

let orders = [];

// API: Show menu
app.get("/api/menu", (req, res) => {
  res.json(foods);
});

// API: Place order
app.post("/api/order", (req, res) => {
  const { foodId, qty } = req.body;

  const food = foods.find(f => f.id === foodId);
  if (!food) {
    return res.status(404).json({ message: "Food not found!" });
  }

  const order = {
    orderId: orders.length + 1,
    food: food.name,
    qty: qty,
    total: food.price * qty
  };

  orders.push(order);
  res.json({ message: "Order placed successfully!", order });
});

// API: Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Food Order App running at http://0.0.0.0:${port}`);
});
