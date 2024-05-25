const { Trip } = require("../../models");

const getDirectionByIdService = async (req) => {
  const { tripId } = req.params;

  const res = await Trip.findById(tripId);

  // return res;

  return {
    departure: res?.departure,
    arrival: res?.arrival,
    points: res?.points,
    directions: res?.directions,
    total_duration: res?.total_duration,

    prices: res?.prices,
    discounts: res?.discounts,
    baggage: res?.baggage,
    transport: res?.transport,

    active: res?.active,
    direct: res?.direct,
    stops: res?.stops,
    
    _id: res?._id,
    trip_number_id: res?.trip_number_id,
    reverse_trip_id: res?.reverse_trip_id,
    reverse_trip_number_id: res?.reverse_trip_number_id,
    
    carrier_id: res?.carrier_id,
    carrier_name: res?.carrier_name,
    consolidator_id: res?.consolidator_id,
    consolidator_name: res?.consolidator_name,
  };
};

module.exports = getDirectionByIdService;

