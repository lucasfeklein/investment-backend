const express = require("express");
const { getInvestments } = require("../controllers/investment");
const router = express.Router();

router.get("/", getInvestments);

router.post("/", (req, res) => {
  res.send("tcay");
});

module.exports = router;
