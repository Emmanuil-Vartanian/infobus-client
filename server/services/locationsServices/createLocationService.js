const { Location } = require("../../models");

const createLocationService = async (req) => {
  const { country, city, address, name } = req.body;

  const prevLocation = await Location.aggregate([
    { $match: { location_number_id: { $exists: true } } },
    { $sort: { location_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevLocationNumberId = prevLocation[0]?.location_number_id;
  const location_number_id = prevLocationNumberId
    ? prevLocationNumberId + 1
    : 1;

  const newLocation = await Location.create({
    country,
    city,
    address,
    name,
    location_number_id,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });

  return newLocation;
};

module.exports = createLocationService;
