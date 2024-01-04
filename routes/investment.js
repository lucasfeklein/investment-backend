const express = require("express");
const {
  getAllInvestments,
  createInvestment,
} = require("../controllers/investment");
const router = express.Router();

router.get("/", getAllInvestments);

router.post("/", createInvestment);

module.exports = router;
