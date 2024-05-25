const { catchAsync } = require("../../helpers");
const { addLocationDistanceService } = require("../../services");

const addLocationDistanceController = catchAsync(async (req, res) => {
  const result = await addLocationDistanceService(req);

  res.status(201).json(result);
});

module.exports = addLocationDistanceController;
