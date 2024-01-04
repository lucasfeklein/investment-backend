const prisma = require("../prisma");

const getAllInvestments = async (req, res) => {
  try {
    const investments = await prisma.investment.findMany();
    res.json({ investments });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllInvestments };
