const createBookingController = require("./createBookingController");
const getAllPassengersController = require("./getAllPassengersController");
const getBookingByIdController = require("./getBookingByIdController");
const getBookingsController = require("./getBookingsController");
const getPassengersController = require("./getPassengersController");
const updateBookingsController = require("./updateBookingsController");

module.exports = {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingsController,
  getPassengersController,
  getAllPassengersController,
}