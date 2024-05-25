const { catchAsync } = require("../../helpers");
const { createBaggageService } = require("../../services");

const createBaggageController = catchAsync(async (req, res) => {
  const result = await createBaggageService(req);

  res.status(201).json(result);
});

module.exports = createBaggageController;