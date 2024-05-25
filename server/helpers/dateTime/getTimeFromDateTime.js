function getTimeFromDateTime(dataTime) {
  return new Date(dataTime).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit"})
}

module.exports = getTimeFromDateTime;
