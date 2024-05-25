const { catchAsync } = require("../../helpers");
const { getTripByIdService } = require("../../services");

const getTripByIdController = catchAsync(async (req, res) => {
  const result = await getTripByIdService(req);

  res.status(200).json(result);
});

module.exports = getTripByIdController;
