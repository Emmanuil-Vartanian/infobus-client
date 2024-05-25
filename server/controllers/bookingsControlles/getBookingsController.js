const { catchAsync } = require("../../helpers");
const { getBookingsService } = require("../../services");

const getBookingsController = catchAsync(async (req, res) => {
  const result = await getBookingsService(req);

  res.status(200).json(result);
});

module.exports = getBookingsController;
