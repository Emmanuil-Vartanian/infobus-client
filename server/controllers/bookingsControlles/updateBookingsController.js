const { catchAsync } = require("../../helpers");
const { updateBookingsService } = require("../../services");

const updateBookingsController = catchAsync(async (req, res) => {
  const result = await updateBookingsService(req);

  res.status(200).json(result);
});

module.exports = updateBookingsController;
