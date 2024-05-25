const { catchAsync } = require("../../helpers");
const { getLocationsService } = require("../../services");

const getLocationController = catchAsync(async (req, res) => {
  const result = await getLocationsService(req);

  res.status(200).json(result);
});

module.exports = getLocationController;
