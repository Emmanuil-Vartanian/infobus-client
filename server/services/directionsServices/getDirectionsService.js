const { isAvailableArray } = require("../../helpers");
const { Direction } = require("../../models");

const getDirectionsService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Direction.aggregate([
        {
          $lookup: {
            from: "trips",
            localField: "trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Direction.aggregate([
        {
          $lookup: {
            from: "trips",
            localField: "trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Direction.aggregate([
        { $match: { consolidator_id: req.user._id } },
        {
          $lookup: {
            from: "trips",
            localField: "trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "dispatcher":
      res = await Direction.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        {
          $lookup: {
            from: "trips",
            localField: "trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getDirectionsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
    const tripActualPrices = isAvailableArray(i?.trip_info)[0]?.prices;
    const directionActualPrices = tripActualPrices?.list?.find(item => item?.dfb_order === i?.dfb_order);
    const newDirectionActualPrices = {
      ow_price: directionActualPrices ? directionActualPrices?.ow_price : tripActualPrices?.ow_price,
      rt_price: directionActualPrices ? directionActualPrices?.rt_price : tripActualPrices?.rt_price,
      season_ow_price:  directionActualPrices ? directionActualPrices?.season_ow_price : tripActualPrices?.season_ow_price,
      season_rt_price:  directionActualPrices ? directionActualPrices?.season_rt_price : tripActualPrices?.season_rt_price,
      start_season_date: tripActualPrices?.start_season_date,
      end_season_date: tripActualPrices?.end_season_date,
    };

    return {
      departure: i?.departure,
      arrival: i?.arrival,
      main_trip_direction: i?.main_trip_direction,
      // trip_info: i?.trip_info,
  
      duration: i?.duration,
  
      prices: newDirectionActualPrices,
      discounts: i?.discounts,
      baggage: i?.baggage,
      transport: i?.transport,
  
      active: i?.active,
      direct: i?.direct,
      stops: i?.stops,
      
      _id: i?._id,
      direction_number_id: i?.direction_number_id,
      dfb_order: i?.dfb_order,
      trip_id: i?.trip_id,
      trip_number_id: i?.trip_number_id,
      reverse_trip_id: i?.reverse_trip_id,
      reverse_trip_number_id: i?.reverse_trip_number_id,
      
      carrier_id: i?.carrier_id,
      carrier_name: i?.carrier_name,
      consolidator_id: i?.consolidator_id,
      consolidator_name: i?.consolidator_name,
    }
  });

  return dataToFrontEnd;
}