const { catchAsync } = require("../../helpers");
const { getAgenciesService } = require("../../services");

const getAgenciesController = catchAsync(async (req, res) => {
  const result = await getAgenciesService(req);

  res.status(200).json(result);
});

module.exports = getAgenciesController;