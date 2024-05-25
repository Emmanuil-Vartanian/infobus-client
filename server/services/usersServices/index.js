const getUsersService = require("./getUsersService");
const createUserService = require("./createUserService");
const updateUsersService = require("./updateUsersService");
const updateUserByIdService = require("./updateUserByIdService");
const getConsolidatorsService = require("./getConsolidatorsService");

module.exports = { 
  createUserService,
  getUsersService,
  updateUsersService,
  getConsolidatorsService,
  updateUserByIdService,
};
