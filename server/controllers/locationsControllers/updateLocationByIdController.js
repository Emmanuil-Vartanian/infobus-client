const { catchAsync } = require("../../helpers");
const { updateLocationByIdService } = require("../../services");

const updateLocationByIdController = catchAsync(async (req, res) => {
  const result = await updateLocationByIdService(req);

  res.status(200).json(result);
});

module.exports = updateLocationByIdController;
