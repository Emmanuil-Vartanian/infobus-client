const { Route } = require("../../models");

const createRouteService = async (req) => {
  const { departure, arrival, points, directions } = req.body;

  const prevRoute = await Route.aggregate([
    { $match: { route_number_id: { $exists: true } } },
    { $sort: { route_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevRouteNumberId = prevRoute[0]?.route_number_id;
  const route_number_id = prevRouteNumberId
    ? prevRouteNumberId + 1
    : 1;

  const newRoute = await Route.create({
    departure, 
    arrival, 
    points,
    directions,
  
    route_number_id,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });
  
  // if (!reverse_route) return newRoute;

  const reversePoints = points.reverse().map((i, idx) => ({...i, point_order: idx}));
  const reverseDirections = reversePoints.reduce((previousValue, element, index, array) => {
    if (!index) return previousValue

    const direction = {from: array[index - 1], to: element}
    return previousValue.concat(direction);
  }, []);

  const newRouteReverse = await Route.create({
    departure: arrival,
    arrival: departure,
    points: reversePoints,
    directions: reverseDirections,
  
    route_number_id: newRoute?.route_number_id + 1,
    reverse_route_number_id: newRoute?.route_number_id,
    reverse_route_id: newRoute.id,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });

  await Route.findByIdAndUpdate( 
    newRoute._id, 
    { reverse_route_number_id: newRouteReverse?.route_number_id, reverse_route_id: newRouteReverse.id, }, 
    { new: true } );
};

module.exports = createRouteService;
