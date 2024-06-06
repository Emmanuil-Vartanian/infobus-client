const createBookingService = require("./createBookingService");
const getAllPassengersService = require("./getAllPassengersService");
const getBookingByIdService = require("./getBookingByIdService");
const getBookingsArchivedService = require("./getBookingsArhivedService");
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
  getBookingsArchivedService,
};