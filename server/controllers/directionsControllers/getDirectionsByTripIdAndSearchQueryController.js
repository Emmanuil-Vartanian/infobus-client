const { catchAsync } = require("../../helpers");
const { getDirectionsByTripIdAndSearchQueryService } = require("../../services");

const getDirectionsByTripIdAndSearchQueryController = catchAsync(async (req, res) => {
  const result = await getDirectionsByTripIdAndSearchQueryService(req);

  res.status(200).json(result);
});

module.exports = getDirectionsByTripIdAndSearchQueryController;
