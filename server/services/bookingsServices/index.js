const createBookingService = require("./createBookingService");
const getAllPassengersService = require("./getAllPassengersService");
const getBookingByIdService = require("./getBookingByIdService");
const getBookingsService = require("./getBookingsService");
const getPassengersService = require("./getPassengersService");
const updateBookingsService = require("./updateBookingsService");

module.exports = {
  createBookingService,
  getBookingsService,
  getBookingByIdService,
  updateBookingsService,
  getPassengersService,
  getAllPassengersService,
}