const { Location } = require("../../models");

const getLocationsService = async (req) => {
  const res = await Location.aggregate([
    { $match: { distance: { $exists: false } } },
    { $match: { active: true } },
    { $sort: { createdAt: 1 } }
  ]);

  const dataToFrontEnd = res?.map(i => ({
    country: i?.country,
    city: i?.city,
    address: i?.address,
    name: i?.name,

    _id: i?._id,
    location_number_id: i?.location_number_id,
  }))

  return dataToFrontEnd;
};

module.exports = getLocationsService;
