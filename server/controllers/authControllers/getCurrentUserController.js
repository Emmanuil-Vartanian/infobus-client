const { catchAsync } = require("../../helpers");
const { getCurrentUserService } = require("../../services");

const getCurrentUserController = catchAsync(async (req, res) => {
  const result = await getCurrentUserService(req);

  res.status(200).json(result);
});

module.exports = getCurrentUserController;
