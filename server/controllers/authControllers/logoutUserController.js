const { catchAsync } = require("../../helpers");
const { logoutUserService } = require("../../services/authServices");

const logoutUserController = catchAsync(async (req, res) => {
  await logoutUserService(req);

  res.status(204).json();
});

module.exports = logoutUserController;
