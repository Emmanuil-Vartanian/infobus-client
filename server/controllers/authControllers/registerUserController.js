const { catchAsync } = require("../../helpers");
const { registerUserService } = require("../../services/authServices");

const registerUserController = catchAsync(async (req, res) => {
  const result = await registerUserService(req);

  res.status(201).json(result);
});

module.exports = registerUserController;
