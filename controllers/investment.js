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

const getInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const investment = await prisma.investment.findUnique({
      where: { id: Number(id) },
    });

    res.status(200).json({ investment });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createInvestment = async (req, res) => {
  try {
    const { userId, initialInvestment } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: `No user with id:${userId}` });
    }

    if (initialInvestment <= 0) {
      return res
        .status(400)
        .json({ error: "Investment can't be negative or 0" });
    }

    if (user.balance < initialInvestment) {
      return res.status(400).json({ error: "Your balance is insufficient" });
    }

    if (!userId || !initialInvestment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { balance: user.balance - initialInvestment },
    });

    const investment = await prisma.investment.create({
      data: { initialInvestment: initialInvestment, ownerId: userId },
    });

    res.status(201).json({ investment });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllInvestments, createInvestment, getInvestment };
