const { catchAsync } = require("../../helpers");
const { updateTripService } = require("../../services");

const updateTripController = catchAsync(async (req, res) => {
  const result = await updateTripService(req);

  res.status(200).json(result);
});

module.exports = updateTripController;
