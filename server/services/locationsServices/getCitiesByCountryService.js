const { Location } = require("../../models");

const getCitiesByCountryService = async (req) => {
  const { country } = req.body;

  return await Location.aggregate([
    { $match: { "country.de": country.de } },
    { $group: {_id: null, city: {$addToSet: "$city"}}},
    { $unwind: "$city" },
    { $project: { _id: 0 }},
    { $sort: { "city.de": 1 } },
  ]);
};

module.exports = getCitiesByCountryService;
