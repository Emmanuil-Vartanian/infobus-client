const { catchAsync } = require("../../helpers");
const { updateAgenciesService } = require("../../services");

const updateAgenciesController = catchAsync(async (req, res) => {
  const result = await updateAgenciesService(req);

  res.status(200).json(result);
});

module.exports = updateAgenciesController;
