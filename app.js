require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//import routes
const investmentRoute = require("./routes/investment");
const userRoute = require("./routes/user");

app.use(express.json());

app.use("/investment", investmentRoute);
app.use("/user", userRoute);

app.get("/", async (req, res) => {
  res.send("oi");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
