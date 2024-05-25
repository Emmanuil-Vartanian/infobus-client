const { catchAsync } = require("../../helpers");
const { getDirectionsBySearchQueryService } = require("../../services");

const getDirectionsBySearchQueryController = catchAsync(async (req, res) => {
  const result = await getDirectionsBySearchQueryService(req);

  res.status(200).json(result);
});

module.exports = getDirectionsBySearchQueryController;
