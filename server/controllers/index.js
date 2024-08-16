const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
} = require("./authControllers");
const {
  createUserController,
  getUsersController,
  updateUsersController,
  getConsolidatorsController,
  updateUserByIdController,
} = require("./usersControllers");
const {
  createCarrierController,
  getCarrierController,
  updateCarrierByIdController,
} = require("./carrierControllers");
const {
  createAgencyController,
  getAgenciesController,
  updateAgenciesController,
  updateAgencyByIdController,
} = require("./agenciesControllers");
const {
  createLocationController,
  getLocationController,
  getCountriesController,
  getCitiesByCountryController,
  getCitiesController,
  getAddressesByCityController,
  addLocationDistanceController,
  getLocationsDistanceController,
  updateLocationByIdController,
  getLocationsDistanceByUserController,
} = require("./locationsControllers");
const {
  createDiscountController,
  getDiscountsController,
  updateDiscountByIdController,
} = require("./discountsControlles");
const {
  createRouteController,
  getRoutesController,
  updateRouteByIdController,
} = require("./routesControlles");
const {
  createTripController,
  getTripsController,
  getTripsBySearchQueryController,
  getTripByIdController,
  updateTripController,
  getClosestTripsController,
  deleteTripByIdController,
} = require("./tripsControllers");
const {
  createBaggageController,
  getBaggageController,
  updateBaggageByIdController,
} = require("./baggageControllers");
const {
  createTransportController,
  getTransportsController,
  updateTransportByIdController,
} = require("./transportsControlles");
const {
  createBookingController,
  getBookingsController,
  updateBookingsController,
  getBookingByIdController,
  getPassengersController,
  getAllPassengersController,
  getBookingsArchivedController,
} = require("./bookingsControlles");
const {
  createDirectionController,
  getDirectionByIdController,
  getDirectionsBySearchQueryController,
  getDirectionsController,
  getDirectionsByTripIdAndSearchQueryController,
  updateDirectionsController,
} = require("./directionsControllers");

module.exports = {
  getDirectionsController,
  createDirectionController,
  getDirectionByIdController,
  getDirectionsBySearchQueryController,
  getDirectionsByTripIdAndSearchQueryController,
  updateDirectionsController,
  // authControllers
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  // usersControllers
  createUserController,
  getUsersController,
  updateUsersController,
  getConsolidatorsController,
  updateUserByIdController,
  // carrierControllers
  createCarrierController,
  getCarrierController,
  updateCarrierByIdController,
  // agenciesControllers
  createAgencyController,
  getAgenciesController,
  updateAgenciesController,
  updateAgencyByIdController,
  // locationsControllers
  createLocationController,
  getLocationController,
  getCountriesController,
  getCitiesController,
  getCitiesByCountryController,
  getAddressesByCityController,
  addLocationDistanceController,
  getLocationsDistanceController,
  updateLocationByIdController,
  getLocationsDistanceByUserController,
  // discountsControlles
  createDiscountController,
  getDiscountsController,
  updateDiscountByIdController,
  // baggageControllers
  getBaggageController,
  createBaggageController,
  updateBaggageByIdController,
  // routesControlles
  createRouteController,
  getRoutesController,
  updateRouteByIdController,
  // tripsControllers
  createTripController,
  getTripsController,
  getTripsBySearchQueryController,
  getTripByIdController,
  getClosestTripsController,
  updateTripController,
  deleteTripByIdController,
  // transportsControlles
  createTransportController,
  getTransportsController,
  updateTransportByIdController,
  // bookingsControlles
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingsController,
  getPassengersController,
  getAllPassengersController,
  getBookingsArchivedController,
};
