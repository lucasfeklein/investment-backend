const prisma = require("../prisma");

const createUser = async (req, res) => {
  try {
    const { email, balance } = req.body;

    if (!email || !balance) {
      return res.status(400).json({ error: "Must provide email and balance" });
    }

    const user = await prisma.user.create({ data: { email, balance } });

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, getAllUsers };
