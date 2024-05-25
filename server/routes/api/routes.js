const express = require("express");
const { authUser } = require("../../middlewares");
const { createRouteController, getRoutesController, updateRouteByIdController, } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getRoutesController);
router.route("/new").post(authUser, createRouteController);
router.route("/:routeId").post(authUser, updateRouteByIdController);

module.exports = router;
