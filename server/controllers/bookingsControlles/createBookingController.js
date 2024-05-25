const { catchAsync } = require("../../helpers");
const { createBookingService } = require("../../services");

const createBookingController = catchAsync(async (req, res) => {
  const result = await createBookingService(req);
  

  res.status(201).json(result);
});

module.exports = createBookingController;