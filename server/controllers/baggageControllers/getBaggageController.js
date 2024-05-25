const { catchAsync } = require("../../helpers");
const { getBaggageService } = require("../../services");

const getBaggageController = catchAsync(async (req, res) => {
  const result = await getBaggageService(req);

  res.status(200).json(result);
});

module.exports = getBaggageController;
