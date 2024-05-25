function getDateTime(date, time) {
  return new Date(`${date}, ${time}`).getTime();
}

module.exports = getDateTime;
