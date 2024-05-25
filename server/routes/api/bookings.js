const express = require("express");
const { authUser, authUserWithNewUser } = require("../../middlewares");
const { getBookingsController, createBookingController, updateBookingsController, getBookingByIdController, getPassengersController, getAllPassengersController } = require("../../controllers");

const router = express.Router();

router.route("/")
  .get(authUser, getBookingsController)
  .post(authUser, updateBookingsController);
router.route("/new").post(authUser, createBookingController);
router.route("/new/welcome").post(authUserWithNewUser, createBookingController);
router.route("/passengers").get(authUser, getPassengersController);
router.route("/passengers/all").get(authUser, getAllPassengersController);

router.route("/:bookingId").get(authUser, getBookingByIdController);

module.exports = router;
