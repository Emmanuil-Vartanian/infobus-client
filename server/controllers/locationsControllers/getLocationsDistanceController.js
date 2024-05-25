const { catchAsync } = require("../../helpers");
const { getLocationsDistanceService } = require("../../services");

const getLocationsDistanceController = catchAsync(async (req, res) => {
  const result = await getLocationsDistanceService(req);

  res.status(200).json(result);
});

module.exports = getLocationsDistanceController;
