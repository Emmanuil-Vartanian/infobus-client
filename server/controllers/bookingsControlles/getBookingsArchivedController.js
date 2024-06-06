const { catchAsync } = require("../../helpers");
const { getBookingsArchivedService } = require("../../services");

const getBookingsArchivedController = catchAsync(async (req, res) => {
  const result = await getBookingsArchivedService(req);

  res.status(200).json(result);
});

module.exports = getBookingsArchivedController;
