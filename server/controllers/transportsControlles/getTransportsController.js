const { catchAsync } = require("../../helpers");
const { getTransportsService } = require("../../services");

const getTransportsController = catchAsync(async (req, res) => {
  const result = await getTransportsService(req);

  res.status(200).json(result);
});

module.exports = getTransportsController;
