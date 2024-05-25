const { catchAsync } = require("../../helpers");
const { getClosestTripsService } = require("../../services");

const getClosestTripsController = catchAsync(async (req, res) => {
  const result = await getClosestTripsService(req);

  res.status(200).json(result);
});

module.exports = getClosestTripsController;
