const { catchAsync } = require("../../helpers");
const { getLocationsDistanceByUserService } = require("../../services");

const getLocationsDistanceByUserController = catchAsync(async (req, res) => {
  const result = await getLocationsDistanceByUserService(req);

  res.status(200).json(result);
});

module.exports = getLocationsDistanceByUserController;
