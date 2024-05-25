const { catchAsync } = require("../../helpers");
const { createDiscountService } = require("../../services");

const createDiscountController = catchAsync(async (req, res) => {
  const result = await createDiscountService(req);

  res.status(201).json(result);
});

module.exports = createDiscountController;