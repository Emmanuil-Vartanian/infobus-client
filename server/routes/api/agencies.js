const express = require("express");
const { authUser } = require("../../middlewares");
const { createAgencyController, getAgenciesController, updateAgenciesController, updateAgencyByIdController, } = require("../../controllers");

const router = express.Router();

router.route("/")
  .get(authUser, getAgenciesController)
  .post(authUser, updateAgenciesController);

router.route("/new").post(authUser, createAgencyController);
router.route("/:agencyId").post(authUser, updateAgencyByIdController);

module.exports = router;
