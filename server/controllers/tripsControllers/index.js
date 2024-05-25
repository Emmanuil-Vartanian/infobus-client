const createTripController = require("./createTripController");
const getClosestTripsController = require("./getClosestTripsController");
const getTripByIdController = require("./getTripByIdController");
const getTripsBySearchQueryController = require("./getTripsBySearchQueryController");
const getTripsController = require("./getTripsController");
const updateTripController = require("./updateTripController");

module.exports = {
  createTripController,
  getTripsController,
  getTripsBySearchQueryController,
  getTripByIdController,
  updateTripController,
  getClosestTripsController,
};
