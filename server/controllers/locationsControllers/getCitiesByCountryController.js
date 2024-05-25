const { catchAsync } = require("../../helpers");
const { getCitiesByCountryService } = require("../../services");

const getCitiesByCountryController = catchAsync(async (req, res) => {
  const result = await getCitiesByCountryService(req);

  res.status(200).json(result);
});

module.exports = getCitiesByCountryController;
