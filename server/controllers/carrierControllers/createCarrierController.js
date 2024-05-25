const { catchAsync } = require("../../helpers");
const { createCarrierService } = require("../../services");

const createCarrierController = catchAsync(async (req, res) => {
  const result = await createCarrierService(req);

  res.status(201).json(result);
});

module.exports = createCarrierController;