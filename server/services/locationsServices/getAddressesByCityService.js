const { Location } = require("../../models");

const getAddressesByCityService = async (req) => {
  const { city } = req.body;

  return await Location.aggregate([
    { $match: { "city.de": city.de } },
    { $sort: { "address.de": 1 } },
  ]);
};

module.exports = getAddressesByCityService;
