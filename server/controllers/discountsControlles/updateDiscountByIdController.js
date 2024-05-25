const { catchAsync } = require("../../helpers");
const { updateDiscountByIdService } = require("../../services");

const updateDiscountByIdController = catchAsync(async (req, res) => {
  const result = await updateDiscountByIdService(req);

  res.status(200).json(result);
});

module.exports = updateDiscountByIdController;
