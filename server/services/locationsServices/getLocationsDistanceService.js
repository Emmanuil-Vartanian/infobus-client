const ObjectId = require('mongodb').ObjectId;
const { Location } = require("../../models");

const getLocationsDistanceService = async (req) => {
  let currentCreator = req.user.id;

  if (req.user.role === 'agency_manager') currentCreator = req.user.consolidator_id

  const res = await Location.aggregate([
    { $match: { distance: { $exists: true } } },
    { $match: { creator_id: new ObjectId(currentCreator)}},
    { $sort: { "city.de": 1 } }
  ]);

  const dataToFrontEnd = res?.map(i => ({
    country: i?.country,
    city: i?.city,
    distance: i?.distance,

    _id: i?._id,
  }))

  return dataToFrontEnd;
};

module.exports = getLocationsDistanceService;
