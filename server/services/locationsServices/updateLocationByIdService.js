const { Location } = require("../../models");

const updateLocationByIdService = async (req) => {
  const { locationId } = req.params;

  const updatedLocation = await Location.findByIdAndUpdate(
    locationId,
    { ...req.body },
    { new: true }
  );

  return updatedLocation;
}
module.exports = updateLocationByIdService;