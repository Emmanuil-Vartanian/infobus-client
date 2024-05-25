const { catchAsync } = require("../../helpers");
const { updateUserByIdService } = require("../../services");

const updateUserByIdController = catchAsync(async (req, res) => {
  const result = await updateUserByIdService(req);

  res.status(200).json(result);
});

module.exports = updateUserByIdController;
