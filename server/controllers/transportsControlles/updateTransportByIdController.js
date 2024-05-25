const { catchAsync } = require("../../helpers");
const { updateTransportByIdService } = require("../../services");

const updateTransportByIdController = catchAsync(async (req, res) => {
  const result = await updateTransportByIdService(req);

  res.status(200).json(result);
});

module.exports = updateTransportByIdController;
