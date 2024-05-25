const createUserController = require("./createUserController");
const getConsolidatorsController = require("./getConsolidatorsController");
const getUsersController = require("./getUsersController");
const updateUserByIdController = require("./updateUserByIdController");
const updateUsersController = require("./updateUsersController");

module.exports = {
  createUserController,
  getUsersController,
  updateUsersController,
  getConsolidatorsController,
  updateUserByIdController,
}