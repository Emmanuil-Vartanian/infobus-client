const { Location } = require("../../models");

const getCountriesService = async () => {
  return await Location.aggregate([
    { $group: {_id: null, country: {$addToSet: "$country"}}},
    { $unwind: "$country" },
    { $project: { _id: 0 }},
    { $sort: { "country.de": 1 } },
  ]);
};

module.exports = getCountriesService;
