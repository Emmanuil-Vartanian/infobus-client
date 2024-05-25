const { catchAsync } = require("../../helpers");
const { getAddressesByCityService } = require("../../services");

const getAddressesByCityController = catchAsync(async (req, res) => {
  const result = await getAddressesByCityService(req);

  res.status(200).json(result);
});

module.exports = getAddressesByCityController;
