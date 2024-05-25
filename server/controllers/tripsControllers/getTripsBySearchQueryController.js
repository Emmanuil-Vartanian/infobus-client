const { catchAsync } = require("../../helpers");
const { getTripsBySearchQueryService } = require("../../services");

const getTripsBySearchQueryController = catchAsync(async (req, res) => {
  const result = await getTripsBySearchQueryService(req);

  res.status(200).json(result);
});

module.exports = getTripsBySearchQueryController;
