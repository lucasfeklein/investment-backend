const express = require("express");
const { getAllInvestments } = require("../controllers/investment");
const router = express.Router();

router.get("/", getAllInvestments);

router.post("/", (req, res) => {
  res.send("tcay");
});

module.exports = router;
