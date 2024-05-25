const express = require("express");
const { authUser } = require("../../middlewares");
const { createTransportController, getTransportsController, updateTransportByIdController } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getTransportsController);
router.route("/new").post(authUser, createTransportController);
router.route("/:transportId").post(authUser, updateTransportByIdController);

module.exports = router;
