const { catchAsync } = require("../../helpers");
const { getBookingByIdService } = require("../../services");

const getBookingByIdController = catchAsync(async (req, res) => {
  const result = await getBookingByIdService(req);

  res.status(200).json(result);
});

module.exports = getBookingByIdController;
