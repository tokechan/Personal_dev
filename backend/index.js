// backend/index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
