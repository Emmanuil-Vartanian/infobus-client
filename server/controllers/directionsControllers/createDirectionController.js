const { catchAsync } = require("../../helpers");
const { createDirectionService } = require("../../services");

const createDirectionController = catchAsync(async (req, res) => {
  const result = await createDirectionService(req);

  res.status(201).json(result);
});

module.exports = createDirectionController;