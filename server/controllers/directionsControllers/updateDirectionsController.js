const { catchAsync } = require("../../helpers");
const { updateDirectionsService } = require("../../services");

const updateDirectionsController = catchAsync(async (req, res) => {
  const result = await updateDirectionsService(req);

  res.status(200).json(result);
});

module.exports = updateDirectionsController;
