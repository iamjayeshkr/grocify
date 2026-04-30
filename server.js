const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 In-memory storage
let items = [];

// ========================
// GET ALL ITEMS
// ========================
app.get("/api/items", (req, res) => {
  res.json({ items });
});

// ========================
// ADD ITEM
// ========================
app.post("/api/items", (req, res) => {
  const { name, category, quantity, priority, unit } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  const newItem = {
    id: Date.now().toString(),
    name,
    category,
    quantity,
    unit: unit || "pcs", // 🔥 FIXED
    priority,
    purchased: false,
  };

  items.unshift(newItem);

  res.json({ item: newItem });
});

// ========================
// DELETE ITEM
// ========================
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;

  items = items.filter((item) => item.id !== id);

  res.json({ success: true });
});

// ========================
// UPDATE ITEM
// ========================
app.patch("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { purchased, quantity } = req.body;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (purchased !== undefined) {
    items[index].purchased = purchased;
  }

  if (quantity !== undefined) {
    items[index].quantity = quantity;
  }

  res.json({ item: items[index] });
});

// =======================
//   TESTING
app.get("/", (req, res) => {
  res.send("🚀 Grocify API is running");
});
// =======================

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
