const { catchAsync } = require("../../helpers");
const { createTripService } = require("../../services");

const createTripController = catchAsync(async (req, res) => {
  const result = await createTripService(req);

  res.status(201).json(result);
});

module.exports = createTripController;