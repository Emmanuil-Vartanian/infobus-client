const { catchAsync } = require("../../helpers");
const { updateCarrierByIdService } = require("../../services");

const updateCarrierByIdController = catchAsync(async (req, res) => {
  const result = await updateCarrierByIdService(req);

  res.status(200).json(result);
});

module.exports = updateCarrierByIdController;
