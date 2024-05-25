const express = require("express");
const router = express.Router();

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
} = require("../../controllers");
const { authUser } = require("../../middlewares");

router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/logout").post(authUser, logoutUserController);
router.route("/current").get(authUser, getCurrentUserController);

module.exports = router;
