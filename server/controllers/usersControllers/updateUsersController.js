const { catchAsync } = require("../../helpers");
const { updateUsersService } = require("../../services");

const updateUsersController = catchAsync(async (req, res) => {
  const result = await updateUsersService(req);

  res.status(200).json(result);
});

module.exports = updateUsersController;
