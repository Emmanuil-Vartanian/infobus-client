const { catchAsync } = require("../../helpers");
const { getDiscountsService } = require("../../services");

const getDiscountsController = catchAsync(async (req, res) => {
  const result = await getDiscountsService(req);

  res.status(200).json(result);
});

module.exports = getDiscountsController;
