const { catchAsync } = require("../../helpers");
const { createRouteService } = require("../../services");

const createRouteController = catchAsync(async (req, res) => {
  const result = await createRouteService(req);

  res.status(201).json(result);
});

module.exports = createRouteController;