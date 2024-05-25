const addLocationDistanceController = require("./addLocationDistanceController");
const createLocationController = require("./createLocationController");
const getAddressesByCityController = require("./getAddressesByCityController");
const getCitiesByCountryController = require("./getCitiesByCountryController");
const getCitiesController = require("./getCitiesController");
const getCountriesController = require("./getCountriesController");
const getLocationController = require("./getLocationController");
const getLocationsDistanceByUserController = require("./getLocationsDistanceByUserController");
const getLocationsDistanceController = require("./getLocationsDistanceController");
const updateLocationByIdController = require("./updateLocationByIdController");

module.exports = {
  getLocationsDistanceByUserController,
  updateLocationByIdController,
  createLocationController,
  getLocationController,
  getCountriesController,
  getCitiesController,
  getCitiesByCountryController,
  getAddressesByCityController,
  addLocationDistanceController,
  getLocationsDistanceController,
};
