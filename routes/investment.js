const express = require("express");
const {
  getAllInvestments,
  createInvestment,
  getInvestment,
  withdrawInvestment,
} = require("../controllers/investment");
const router = express.Router();

router.get("/", getAllInvestments);

router.post("/", createInvestment);

router.get("/:id", getInvestment);

router.put("/:id", withdrawInvestment);

module.exports = router;
