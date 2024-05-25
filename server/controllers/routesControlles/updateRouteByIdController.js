const { catchAsync } = require("../../helpers");
const { updateRouteByIdService } = require("../../services");

const updateRouteByIdController = catchAsync(async (req, res) => {
  const result = await updateRouteByIdService(req);

  res.status(200).json(result);
});

module.exports = updateRouteByIdController;
