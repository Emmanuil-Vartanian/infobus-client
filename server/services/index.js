const { registerUserService, loginUserService, logoutUserService, getCurrentUserService, } = require("./authServices");
const { createUserService, getUsersService, updateUsersService, getConsolidatorsService, updateUserByIdService } = require("./usersServices");
const { createCarrierService, getCarrierService, updateCarrierByIdService,  } = require("./carriersServices");
const { createAgencyService, getAgenciesService, updateAgenciesService, updateAgencyByIdService } = require("./agenciesServices");
const { createLocationService, getLocationsService, getCountriesService, getCitiesByCountryService, getCitiesService, getAddressesByCityService, addLocationDistanceService, getLocationsDistanceService, updateLocationByIdService, getLocationsDistanceByUserService } = require("./locationsServices");
const { createDiscountService, getDiscountsService, updateDiscountByIdService } = require("./discountsServices");
const { getRoutesService, createRouteService, updateRouteByIdService } = require("./routesService");
const { createTripService, getTripsService, getTripByIdService, updateTripService, getClosestTripsService } = require("./tripsServices");
const { createBaggageService, getBaggageService, updateBaggageByIdService } = require("./baggageServices");
const { createTransportService, getTransportsService, updateTransportByIdService } = require("./transportsService");
const { createBookingService, getBookingsService, updateBookingsService, getBookingByIdService, getPassengersService, getAllPassengersService } = require("./bookingsServices");
const { createDirectionService, getDirectionByIdService, getDirectionsBySearchQueryService, getDirectionsService, getDirectionsByTripIdAndSearchQueryService, updateDirectionsService } = require("./directionsServices");


module.exports = {
  getDirectionsService,
  createDirectionService,
  getDirectionByIdService,
  getDirectionsBySearchQueryService,
  getDirectionsByTripIdAndSearchQueryService,
  updateDirectionsService,
  // authServices
  registerUserService,
  loginUserService,
  logoutUserService,
  getCurrentUserService,
  // usersServices
  createUserService,
  getUsersService,
  updateUsersService,
  getConsolidatorsService,
  updateUserByIdService,
  // carriersServices
  createCarrierService,
  getCarrierService,
  updateCarrierByIdService,
  // agenciesServices
  createAgencyService,
  getAgenciesService,
  updateAgenciesService,
  updateAgencyByIdService,
  // locationsServices
  createLocationService,
  getLocationsService,
  getCountriesService,
  getCitiesService,
  getCitiesByCountryService,
  getAddressesByCityService,
  addLocationDistanceService,
  getLocationsDistanceService,
  updateLocationByIdService,
  getLocationsDistanceByUserService,
  // discountsServices
  createDiscountService,
  getDiscountsService,
  updateDiscountByIdService,
  // baggageServices
  createBaggageService,
  getBaggageService,
  updateBaggageByIdService,
  // routesService
  createRouteService,
  getRoutesService,
  updateRouteByIdService,
  // tripsServices
  createTripService,
  getTripsService,
  
  getTripByIdService,
  getClosestTripsService,
  updateTripService,
  // transportsService
  createTransportService,
  getTransportsService,
  updateTransportByIdService,
  // bookingsServices
  createBookingService,
  getBookingsService,
  getBookingByIdService,
  updateBookingsService,
  getPassengersService,
  getAllPassengersService,
};
