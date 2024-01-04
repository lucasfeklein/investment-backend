const express = require("express");
const {
  getAllInvestments,
  createInvestment,
  getInvestment,
} = require("../controllers/investment");
const router = express.Router();

router.get("/", getAllInvestments);

router.post("/", createInvestment);

router.get("/:id", getInvestment);

module.exports = router;
