const ObjectId = require('mongodb').ObjectId;
const { Direction } = require("../../models");

const getDirectionsByTripIdAndSearchQueryService = async (req) => {
  const { departure, arrival } = req.body;

  const res = await Direction.aggregate([
    { $match: {trip_id: new ObjectId(req?.body?.trip_id)}},
    { $match: {"departure.city.de": departure?.city?.de, "arrival.city.de": arrival?.city?.de }},
    {
      $lookup: {
        from: "trips",
        localField: "trip_id",
        foreignField: "_id",
        as: "trip_info",
      },
    },
  ]);
  return setDataToFrontEnd(res);
};

module.exports = getDirectionsByTripIdAndSearchQueryService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
  const trip_info = i?.trip_info ? i?.trip_info[0] : {};
  const { seats_selection, discounts, seats, points } = trip_info;

  const currentPointDeparture = points?.find(item => item?.point_order === i?.departure?.point_order);
  const newDeparture = {
    ...i?.departure,
    address: currentPointDeparture?.address,
    name: currentPointDeparture?.name,
  }
  const currentPointArrival = points?.find(item => item?.point_order === i?.arrival?.point_order);
  const newArrival  = {
    ...i?.arrival,
    address: currentPointArrival?.address,
    name: currentPointArrival?.name,
  }

  const newSeats = seats?.map(i => ({seat: i?.seat, booked: i?.booked_dates?.concat(i?.blocked_dates)}));

  return {
    departure: newDeparture,
    arrival: newArrival,
    main_trip_direction: i?.main_trip_direction,

    duration: i?.duration,
    baggage: i?.baggage,

    prices: i?.prices, //TODO select price
    transport: i?.transport,
    trip_info,
    
    seats_selection,
    seats: newSeats,
    discounts,

    active: i?.active,
    direct: i?.direct,
    stops: i?.stops,
    
    _id: i?._id,
    direction_number_id: i?.direction_number_id,
    dfb_order: i?.dfb_order,
    trip_id: i?.trip_id,
    reverse_trip_id: i?.reverse_trip_id,
    
    carrier_id: i?.carrier_id,
    carrier_name: i?.carrier_name,
    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,
  }
});

  return dataToFrontEnd[0];
}
