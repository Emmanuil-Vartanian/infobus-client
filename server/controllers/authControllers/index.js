const getCurrentUserController = require("./getCurrentUserController");
const loginUserController = require("./loginUserController");
const logoutUserController = require("./logoutUserController");
const registerUserController = require("./registerUserController");

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
};