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
    console.error("Error fetching investment:", error);
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

const withdrawInvestment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const investment = await prisma.investment.findUnique({
      where: { id: id },
    });

    if (!investment) {
      return res.status(400).json({ error: `No investment with id:${id}` });
    }

    const { createdAt, profit, initialInvestment } = investment;
    const currentDate = new Date();
    const timeDifferenceInYears =
      (currentDate.getTime() - createdAt.getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    let tax = 0;

    if (timeDifferenceInYears < 1) {
      tax = 0.225;
    } else if (timeDifferenceInYears >= 1 && timeDifferenceInYears <= 2) {
      tax = 0.185;
    } else {
      tax = 0.15;
    }

    const user = await prisma.user.findUnique({
      where: { id: investment.ownerId },
    });

    const investmentWithdrawn = await prisma.investment.update({
      where: { id: id },
      data: { isWithdrawn: true },
    });

    const gainsAfterTax = initialInvestment + profit * (1 - tax);

    const userUpdatedBalance = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance + gainsAfterTax },
    });

    res
      .status(200)
      .json({ user: userUpdatedBalance, investment: investmentWithdrawn });
  } catch (error) {
    console.error("Error fetching to withdraw investment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllInvestments,
  createInvestment,
  getInvestment,
  withdrawInvestment,
};
