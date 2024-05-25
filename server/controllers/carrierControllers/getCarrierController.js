const { catchAsync } = require("../../helpers");
const { getCarrierService } = require("../../services");

const getCarrierController = catchAsync(async (req, res) => {
  const result = await getCarrierService(req);

  res.status(200).json(result);
});

module.exports = getCarrierController;