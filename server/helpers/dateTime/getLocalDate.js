function getLocalDate(date) {
  if(!date) return null
  return new Date(date)?.toLocaleString('uk-UA',{day:'numeric', month:'numeric', year:'numeric'})
}

module.exports = getLocalDate;