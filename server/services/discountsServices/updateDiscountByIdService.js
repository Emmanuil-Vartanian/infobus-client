const { Discount } = require("../../models");

const updateDiscountByIdService = async (req) => {
  const { discountId } = req.params;

  const updatedDiscount = await Discount.findByIdAndUpdate(
    discountId,
    { ...req.body },
    { new: true }
  );

  return updatedDiscount;
}
module.exports = updateDiscountByIdService;