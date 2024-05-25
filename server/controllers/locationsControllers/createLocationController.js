const { catchAsync } = require("../../helpers");
const { createLocationService } = require("../../services");

const createLocationController = catchAsync(async (req, res) => {
  const result = await createLocationService(req);

  res.status(201).json(result);
});

module.exports = createLocationController;
