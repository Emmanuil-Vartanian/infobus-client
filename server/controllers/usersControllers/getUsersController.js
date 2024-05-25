const { catchAsync } = require("../../helpers");
const { getUsersService } = require("../../services");

const getUsersController = catchAsync(async (req, res) => {
  const result = await getUsersService(req);

  res.status(200).json(result);
});

module.exports = getUsersController;
