const { catchAsync } = require("../../helpers");
const { updateAgencyByIdService } = require("../../services");

const updateAgencyByIdController = catchAsync(async (req, res) => {
  const result = await updateAgencyByIdService(req);

  res.status(200).json(result);
});

module.exports = updateAgencyByIdController;
