const getTimeBetweenDates = (startDate, endDate) => {
  const startD = new Date(startDate).getTime();
  const endD = new Date(endDate).getTime();
  const millisecondsDuration = Math.abs(startD - endD);
  const deltaInSeconds = Math.abs(startD - endD) / 1000;

  const days = Math.floor(deltaInSeconds / 86400);
  const deltaMinusDaysInSeconds = deltaInSeconds - days * 86400;

  const hours = Math.floor(deltaMinusDaysInSeconds / 3600) % 24;
  const deltaMinusHoursInSeconds = deltaMinusDaysInSeconds - hours * 3600;

  const minutes = Math.floor(deltaMinusHoursInSeconds / 60) % 60;
  // const deltaMinusMinutesInSeconds = deltaMinusHoursInSeconds - minutes * 60;
  // const seconds = Math.floor(deltaMinusMinutesInSeconds % 60);


  return { days, hours, minutes, milliseconds: millisecondsDuration };
};

module.exports = getTimeBetweenDates;
