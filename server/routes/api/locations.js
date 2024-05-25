const express = require("express");
const { authUser } = require("../../middlewares");
const { createLocationController, getLocationController, getCountriesController, getCitiesByCountryController, getCitiesController, getAddressesByCityController, addLocationDistanceController, getLocationsDistanceController, updateLocationByIdController, getLocationsDistanceByUserController } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getLocationController);
router.route("/new").post(authUser, createLocationController);
router.route("/countries").get(authUser, getCountriesController);
router.route("/countries/cities").post(authUser, getCitiesByCountryController);
router.route("/cities").get(getCitiesController);
router.route("/cities/addresses").post(authUser, getAddressesByCityController);
router.route("/distance")
  .get(authUser, getLocationsDistanceController)
  .post(authUser, addLocationDistanceController);
router.route("/distance/:userId").get(authUser, getLocationsDistanceByUserController)
router.route("/:locationId").post(authUser, updateLocationByIdController);

module.exports = router;