const { catchAsync } = require("../../helpers");
const { getDirectionsService } = require("../../services");

const getDirectionsController = catchAsync(async (req, res) => {
  const result = await getDirectionsService(req);

  res.status(200).json(result);
});

module.exports = getDirectionsController;
