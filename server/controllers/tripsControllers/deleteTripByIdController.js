const { catchAsync } = require("../../helpers");
const { deleteTripByIdService } = require("../../services");

const deleteTripByIdController = catchAsync(async (req, res) => {
  await deleteTripByIdService(req);

  res.status(200).json();
});

module.exports = deleteTripByIdController;
