const { Trip } = require("../../models");

const deleteTripByIdService = async (req) => {
  const { tripId } = req.params;

  await Trip.findByIdAndDelete(tripId);
};

module.exports = deleteTripByIdService;
