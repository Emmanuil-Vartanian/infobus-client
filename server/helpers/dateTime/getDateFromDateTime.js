function getDateFromDateTime(date) {
  var local = new Date(date);
  return local.toJSON().slice(0, 10);
}

module.exports = getDateFromDateTime;
