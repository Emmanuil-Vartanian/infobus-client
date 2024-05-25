const { Trip } = require("../../models");

const getClosestTripsService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Trip.aggregate([
        { $match: { "departure.date_list": { $elemMatch: { $gte: "2024-10-01"}}}},
        // { $match: {"departure.date_list": {$elemMatch: { $gte: "2024-05-25"}}}},
      ]);
      return res
      return setDataToFrontEnd(res);


    // case "agency_manager":
    //   res = await Trip.aggregate([
    //     { $match: { consolidator_id: req.user.consolidator_id } },
    //     { $sort: { createdAt: 1 } }
    //   ]);
    //   return setDataToFrontEnd(res);

    default:
      return [];
  }

};

module.exports = getClosestTripsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    departure: i?.departure,
    arrival: i?.arrival,
    // points: i?.points,
    // directions: i?.directions,
    total_duration: i?.total_duration,

    prices: i?.prices,
    discounts: i?.discounts,
    baggage: i?.baggage,
    transport: i?.transport,
    seats_selection: i?.seats_selection,

    active: i?.active,
    direct: i?.direct,
    stops: i?.stops,
    
    _id: i?._id,
    trip_number_id: i?.trip_number_id,
    reverse_trip_id: i?.reverse_trip_id,
    reverse_trip_number_id: i?.reverse_trip_number_id,
    
    carrier_id: i?.carrier_id,
    carrier_name: i?.carrier_name,
    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,

  }));

  return dataToFrontEnd;
}
