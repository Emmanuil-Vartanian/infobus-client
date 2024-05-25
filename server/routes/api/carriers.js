const express = require("express");
const { authUser } = require("../../middlewares");
const { createCarrierController, getCarrierController, updateCarrierByIdController } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getCarrierController);
router.route("/new").post(authUser, createCarrierController);
router.route("/:carrierId").post(authUser, updateCarrierByIdController);


module.exports = router;
