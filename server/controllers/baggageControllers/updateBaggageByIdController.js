const { catchAsync } = require("../../helpers");
const { updateBaggageByIdService } = require("../../services");

const updateBaggageByIdController = catchAsync(async (req, res) => {
  const result = await updateBaggageByIdService(req);

  res.status(200).json(result);
});

module.exports = updateBaggageByIdController;
