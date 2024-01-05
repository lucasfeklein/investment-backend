const prisma = require("./prisma");

function isDate2LaterThanDate1(investmentDate, currentDate) {
  const formattedInvestmentDate = new Date(investmentDate);
  const formattedCurrentDate = new Date(currentDate);

  formattedInvestmentDate.setHours(0, 0, 0, 0);
  formattedCurrentDate.setHours(0, 0, 0, 0);

  return formattedCurrentDate.getTime() > formattedInvestmentDate.getTime();
}

async function updateProfit() {
  const investments = await prisma.investment.findMany();
  const currentDate = new Date();

  for (const investment of investments) {
    const { lastUpdateAt, id, profit, initialInvestment, isWithdrawn } =
      investment;

    // if statement to make sure currentDate is later than the
    // lastUpdateAt from investment and the day of the currentDate is equal to the day of lastUpdateAt
    // to update profit every month in the same day the money was invested
    if (
      isDate2LaterThanDate1(lastUpdateAt, currentDate) &&
      currentDate.getDate() === lastUpdateAt.getDate() &&
      !isWithdrawn
    ) {
      const addGainsToProfit = profit + initialInvestment * 0.0052;
      await prisma.investment.update({
        where: { id: id },
        data: { lastUpdateAt: currentDate, profit: profit + addGainsToProfit },
      });
    }
  }

  setTimeout(() => updateProfit(), 24 * 60 * 60 * 1000);
}

module.exports = { isDate2LaterThanDate1, updateProfit };
