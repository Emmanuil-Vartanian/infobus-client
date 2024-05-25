const { catchAsync } = require("../../helpers");
const { createAgencyService } = require("../../services");

const createAgencyController = catchAsync(async (req, res) => {
  const result = await createAgencyService(req);

  res.status(201).json(result);
});

module.exports = createAgencyController;