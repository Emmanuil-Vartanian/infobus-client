const { catchAsync } = require("../../helpers");
const { createTransportService } = require("../../services");

const createTransportController = catchAsync(async (req, res) => {
  const result = await createTransportService(req);

  res.status(201).json(result);
});

module.exports = createTransportController;