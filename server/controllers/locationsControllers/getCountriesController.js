const { catchAsync } = require("../../helpers");
const { getCountriesService } = require("../../services");

const getCountriesController = catchAsync(async (req, res) => {
  const result = await getCountriesService(req);

  res.status(200).json(result);
});

module.exports = getCountriesController;
