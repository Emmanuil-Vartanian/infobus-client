const { catchAsync } = require("../../helpers");
const { loginUserService } = require("../../services/authServices");

const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUserService(req);

  res.status(200).json(result);
});

module.exports = loginUserController;
