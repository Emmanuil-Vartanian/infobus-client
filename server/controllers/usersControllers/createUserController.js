const { catchAsync } = require("../../helpers");
const { createUserService } = require("../../services");

const createUserController = catchAsync(async (req, res) => {
  const result = await createUserService(req);

  res.status(201).json(result);
});

module.exports = createUserController;
