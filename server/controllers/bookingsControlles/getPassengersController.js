const { catchAsync } = require("../../helpers");
const { getPassengersService } = require("../../services");

const getPassengersController = catchAsync(async (req, res) => {
  const result = await getPassengersService(req);

  res.status(200).json(result);
});

module.exports = getPassengersController;
