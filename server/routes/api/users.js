const express = require("express");
const { authUser } = require("../../middlewares");
const { createUserController, getUsersController, updateUsersController, getConsolidatorsController, updateUserByIdController } = require("../../controllers");

const router = express.Router();

router.route("/")
  .get(authUser, getUsersController)
  .post(authUser, updateUsersController);

router.route("/new").post(authUser, createUserController);
router.route("/consolidators").get(authUser, getConsolidatorsController);
router.route("/:userId").post(authUser, updateUserByIdController);


module.exports = router;
