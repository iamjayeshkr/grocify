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

// START SERVER
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Backend running at http://0.0.0.0:3000");
});