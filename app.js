require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(process.env.PORT);
  res.send("oi");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
