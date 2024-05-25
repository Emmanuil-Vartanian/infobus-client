const bcryptjs = require("bcryptjs");

const setHashPassword = async function (password) {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};
const comparePassword = async function (password, userPassword) {
  return await bcryptjs.compare(password, userPassword);
};

module.exports = {
  setHashPassword,
  comparePassword,
};