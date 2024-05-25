const { catchAsync } = require("../../helpers");
const { getConsolidatorsService } = require("../../services");

const getConsolidatorsController = catchAsync(async (req, res) => {
  const result = await getConsolidatorsService(req);

  res.status(200).json(result);
});

module.exports = getConsolidatorsController;
