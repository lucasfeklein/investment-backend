const prisma = require("../prisma");

const getAllInvestments = async (req, res) => {
  try {
    const investments = await prisma.investment.findMany();
    res.status(200).json({ investments });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createInvestment = async (req, res) => {
  try {
    const { owner, initialInvestment } = req.body;

    if (!owner || !initialInvestment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const investment = await prisma.investment.create({
      data: { owner, initialInvestment },
    });

    res.status(201).json({ investment });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllInvestments, createInvestment };
