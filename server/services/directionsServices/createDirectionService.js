const { Direction } = require("../../models");

const createDirectionService = async (req) => {
  const {
    departure, 
    arrival,
    main_trip_direction,
    duration,
    dfb_order,
    prices,
    seats,

    trip_id,
    trip_number_id,
    reverse_trip_id,
    reverse_trip_number_id,
    carrier_id,
    carrier_name,
    consolidator_id,
    consolidator_name,
    creator_id,
  } = req.body;

  const prevDirection = await Direction.aggregate([
    { $match: { direction_number_id: { $exists: true } } },
    { $sort: { direction_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevDirectionNumberId = prevDirection[0]?.direction_number_id;
  const direction_number_id = prevDirectionNumberId
    ? prevDirectionNumberId + 1
    : 1;

    const newDirection = await Direction.create({
      departure, 
      arrival,
      main_trip_direction,
      duration,
      prices,
      seats_count: seats,
      
      direction_number_id,
      dfb_order,
      
      trip_id,
      trip_number_id,
      reverse_trip_id,
      reverse_trip_number_id,
      carrier_id,
      carrier_name,
      consolidator_id,
      consolidator_name,
      creator_id,
    });
    
  return newDirection

};

module.exports = createDirectionService;
