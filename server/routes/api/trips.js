const express = require("express");
const { authUser } = require("../../middlewares");
const {
  createTripController,
  getTripsController,
  getTripsBySearchQueryController,
  getTripByIdController,
  updateTripController,
  getClosestTripsController,
  deleteTripByIdController,
} = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getTripsController);
router.route("/closest").get(authUser, getClosestTripsController);

router.route("/new").post(authUser, createTripController);
router.route("/search").post(authUser, getTripsBySearchQueryController);
router
  .route("/:tripId")
  .get(authUser, getTripByIdController)
  .post(authUser, updateTripController);

router.route("/:tripId").delete(authUser, deleteTripByIdController);

module.exports = router;
