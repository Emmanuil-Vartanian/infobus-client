const ObjectId = require('mongodb').ObjectId;
const { Location } = require("../../models");

const getLocationsDistanceByUserService = async (req) => {
  const { userId } = req.params;
  let currentCreator = userId;

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

module.exports = getLocationsDistanceByUserService;
