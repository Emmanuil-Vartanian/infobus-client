const { catchAsync } = require("../../helpers");
const { getTripsService } = require("../../services");

const getTripsController = catchAsync(async (req, res) => {
  const result = await getTripsService(req);

  res.status(200).json(result);
});

module.exports = getTripsController;
