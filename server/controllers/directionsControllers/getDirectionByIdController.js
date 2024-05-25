const { catchAsync } = require("../../helpers");
const { getDirectionByIdService } = require("../../services");

const getDirectionByIdController = catchAsync(async (req, res) => {
  const result = await getDirectionByIdService(req);

  res.status(200).json(result);
});

module.exports = getDirectionByIdController;
