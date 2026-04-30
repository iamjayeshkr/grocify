const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let items = [];

// GET all items
app.get("/api/items", (req, res) => {
  res.json({ items });
});

// ADD item
app.post("/api/items", (req, res) => {
  const { name, category, quantity, priority } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  const newItem = {
    id: Date.now().toString(),
    name,
    category,
    quantity,
    priority,
    purchased: false,
  };

  items.unshift(newItem);

  res.json({ item: newItem });
});

// DELETE
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  res.json({ success: true });
});

app.patch("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { purchased, quantity } = req.body;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  // update fields safely
  if (purchased !== undefined) {
    items[index].purchased = purchased;
  }

  if (quantity !== undefined) {
    items[index].quantity = quantity;
  }

  res.json({ item: items[index] });
});

// START SERVER
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Backend running at http://0.0.0.0:3000");
});