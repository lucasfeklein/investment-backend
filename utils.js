function isDate2LaterThanDate1(date1, date2) {
  const formattedDate1 = new Date(date1);
  const formattedDate2 = new Date(date2);

  formattedDate1.setHours(0, 0, 0, 0);
  formattedDate2.setHours(0, 0, 0, 0);

  return formattedDate2.getTime() > formattedDate1.getTime();
}

module.exports = { isDate2LaterThanDate1 };
