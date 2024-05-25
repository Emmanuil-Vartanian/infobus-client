const express = require("express");
const { authUser } = require("../../middlewares");
const { getBaggageController, createBaggageController, updateBaggageByIdController } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getBaggageController);
router.route("/new").post(authUser, createBaggageController);
router.route("/:baggageId").post(authUser, updateBaggageByIdController);

module.exports = router;
