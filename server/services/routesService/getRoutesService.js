const Route = require("../../models/route");

const getRoutesService = async () => {
  const res = await Route.aggregate([
    { $match: { active: true } },
    { $sort: { createdAt: 1 } }
  ]);
  
  const dataToFrontEnd = res?.map(i => ({
    departure: i?.departure,
    arrival: i?.arrival,
    points: i?.points,
    directions: i?.directions,

    _id: i?._id,
    route_number_id: i?.route_number_id,
    reverse_route_id: i?.reverse_route_id,
    reverse_route_number_id: i?.reverse_route_number_id,
  }))

  return dataToFrontEnd;
};

module.exports = getRoutesService;
