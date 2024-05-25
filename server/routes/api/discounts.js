const express = require("express");
const { authUser } = require("../../middlewares");
const { createDiscountController, getDiscountsController, updateDiscountByIdController } = require("../../controllers");

const router = express.Router();

router.route("/").get(authUser, getDiscountsController);
router.route("/new").post(authUser, createDiscountController);
router.route("/:discountId").post(authUser, updateDiscountByIdController);

module.exports = router;
