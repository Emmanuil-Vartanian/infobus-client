const { catchAsync } = require("../../helpers");
const { getRoutesService } = require("../../services");

const getRoutesController = catchAsync(async (req, res) => {
  const result = await getRoutesService(req);

  res.status(200).json(result);
});

module.exports = getRoutesController;
