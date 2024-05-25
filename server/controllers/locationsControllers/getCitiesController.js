const { catchAsync } = require("../../helpers");
const { getCitiesService } = require("../../services");

const getCitiesController = catchAsync(async (req, res) => {
  const result = await getCitiesService(req);

  res.status(200).json(result);
});

module.exports = getCitiesController;
