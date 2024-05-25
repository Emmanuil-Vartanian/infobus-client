const express = require("express");
const { authUser } = require("../../middlewares");
const {
  createDirectionController,
  getDirectionByIdController,
  getDirectionsBySearchQueryController,
  getDirectionsController,
  getDirectionsByTripIdAndSearchQueryController,
  updateDirectionsController,
} = require("../../controllers");

const router = express.Router();

router.route("/")
  .get(authUser, getDirectionsController)
  .post(authUser, updateDirectionsController);
router.route("/new").post(authUser, createDirectionController);
router.route("/search").post(authUser, getDirectionsBySearchQueryController);
router.route("/search/trip").post(authUser, getDirectionsByTripIdAndSearchQueryController);
router.route("/:directionId").post(authUser, getDirectionByIdController);

// without auth
router.route("/search/welcome").post(getDirectionsBySearchQueryController);
router.route("/search/trip/welcome").post(getDirectionsByTripIdAndSearchQueryController);

module.exports = router;
