const { Direction } = require("../../models");

const getDirectionsBySearchQueryService = async (req) => {
  const { departure, arrival } = req.body;
 
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Direction.aggregate([
        { $match: { active: true }},
        { $match: { "departure.city.de": departure?.city?.de, "arrival.city.de": arrival?.city?.de }},
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

    case "agency_manager":
      res = await Direction.aggregate([
        { $match: { active: true }},
        { $match: { "consolidator_id": req?.user?.consolidator_id }},
        { $match: { "departure.city.de": departure?.city?.de, "arrival.city.de": arrival?.city?.de }},
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

    case undefined:
      res = await Direction.aggregate([
        { $match: { active: true }},
        { $match: { "departure.city.de": departure?.city?.de, "arrival.city.de": arrival?.city?.de }},
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

    default:
      return [];
  }
};

module.exports = getDirectionsBySearchQueryService;

function setDataToFrontEnd(res) {
  let today = new Date().toJSON()?.slice(0, 10);
  const filteredRes = res?.filter(i => i?.trip_info[0]?.departure?.end_date >= today)

  // return res
  const dataToFrontEnd = filteredRes?.map((i) => {
  const trip_info = i?.trip_info ? i?.trip_info[0] : {};
  const { seats, seats_selection, seats_count, discounts, baggage, points, prices } = trip_info ?? {};

  const currentPointDeparture = points?.find(item => item?.point_order === i?.departure?.point_order);
  const newDeparture = {
    ...i?.departure,
    address: currentPointDeparture?.address,
    name: currentPointDeparture?.name,
    address_for_week: currentPointDeparture?.address_for_week,
  }
  const currentPointArrival = points?.find(item => item?.point_order === i?.arrival?.point_order);
  const newArrival  = {
    ...i?.arrival,
    address: currentPointArrival?.address,
    name: currentPointArrival?.name,
    address_for_week: currentPointArrival?.address_for_week,
  }
  const newSeats = seats?.map(i => ({seat: i?.seat, booked: i?.booked_dates?.concat(i?.blocked_dates)}));
  const tripPricesListCurrentItem = prices?.list?.find(item => item?.dfb_order === i?.dfb_order);

  let newPrices = i?.prices
  if (tripPricesListCurrentItem) newPrices = {
    dfb_order: tripPricesListCurrentItem?.dfb_order,
    ow_price: tripPricesListCurrentItem?.ow_price,
    rt_price: tripPricesListCurrentItem?.rt_price,
    season_ow_price: tripPricesListCurrentItem?.season_ow_price,
    season_rt_price: tripPricesListCurrentItem?.season_rt_price,
    start_season_date: prices?.start_season_date,
    end_season_date: prices?.end_season_date,
  }
  if (!tripPricesListCurrentItem) newPrices = {
    dfb_order: i?.dfb_order,
    ow_price: prices?.ow_price,
    rt_price: prices?.rt_price,
    season_ow_price: prices?.season_ow_price,
    season_rt_price: prices?.season_rt_price,
    start_season_date: prices?.start_season_date,
    end_season_date: prices?.end_season_date,
  }
  
  return {
    _id: i?._id,
    departure: newDeparture,
    arrival: newArrival,
    main_trip_direction: i?.main_trip_direction,
    duration: i?.duration,
    
    prices: newPrices, //TODO select price
    transport: i?.transport,
    
    seats_selection,
    seats_count,
    seats: newSeats,
    discounts,
    baggage,

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

  return dataToFrontEnd;
}
