function incrementTime(dateObj, timeIncrements) {
  const tomiliseconds = (hrs, min, sec) =>
    (hrs * 60 * 60 + min * 60 + sec) * 1000;

  const originalMilli = dateObj.getTime();
  const millisecondIncrements = tomiliseconds(
    timeIncrements.hours,
    timeIncrements.minutes,
    timeIncrements.seconds
  );
  return new Date(originalMilli + millisecondIncrements);
}

function incrementDates(date, dateIncrements) {
  const modifiedDate = new Date(date.valueOf());
  modifiedDate.setDate(date.getDate() + dateIncrements.days);
  modifiedDate.setMonth(date.getMonth() + dateIncrements.months);
  modifiedDate.setFullYear(date.getFullYear() + dateIncrements.years);
  return modifiedDate;
}

function incrementByDay(date, dayIncrement) {
  return incrementDates(date, {
    days: dayIncrement,
    months: 0,
    years: 0,
  });
}
module.exports = { incrementByDay, incrementTime };
