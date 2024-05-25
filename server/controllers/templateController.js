const { catchAsync } = require("../../helpers");

const templateController = catchAsync(async (req, res) => {
  const result = await templateService(req);

  res.status(200).json(result);
});

module.exports = templateController;
