const { catchAsync } = require("../../helpers");
const { getAllPassengersService } = require("../../services");

const getAllPassengersController = catchAsync(async (req, res) => {
  const result = await getAllPassengersService(req);

  res.status(200).json(result);
});

module.exports = getAllPassengersController;
