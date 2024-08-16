const { Booking } = require("../../models");

const getBookingsService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Booking.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "trips",
            localField: "reverse_trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Booking.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "trips",
            localField: "reverse_trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user._id } },
        { $sort: { createdAt: 1 } },
        {
          $lookup: {
            from: "trips",
            localField: "reverse_trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
      ]);
      return setDataToFrontEnd(res);

    case "dispatcher":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        { $sort: { createdAt: 1 } },
        {
          $lookup: {
            from: "trips",
            localField: "reverse_trip_id",
            foreignField: "_id",
            as: "trip_info",
          },
        },
      ]);
      return setDataToFrontEnd(res);

    case "carrier_manager":
      res = await Booking.aggregate([
        { $match: { creator_id: req.user._id } },
        { $sort: { createdAt: 1 } },
      ]);
      return setDataToFrontEnd(res);

    case "agency_manager":
      res = await Booking.aggregate([
        { $match: { creator_id: req.user._id } },
        { $sort: { createdAt: 1 } },
      ]);
      return setDataToFrontEnd(res);

    case "user":
      res = await Booking.aggregate([
        { $match: { creator_id: req.user._id } },
        { $sort: { createdAt: 1 } },
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getBookingsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
    return {
      createdAt: i?.createdAt,
      departure: i?.departure,
      arrival: i?.arrival,
      departure_reverse: i?.departure_reverse,
      arrival_reverse: i?.arrival_reverse,
      duration: i?.duration,

      passengers_list: i?.passengers_list,
      price: i?.price,
      payment_place: i?.payment_place,
      status: i?.status,
      buch: i?.buch,
      active: i?.active,
      type: i?.type,
      // ===== booking id =====
      _id: i?._id,
      booking_number_id: i?.booking_number_id,
      // ===== direction id =====
      direction_id: i?.direction_id,
      direction_number_id: i?.direction_number_id,
      reverse_direction_id: i?.reverse_direction_id,
      // ===== trip id =====
      trip_info: i?.trip_info ? i?.trip_info[0] : null,
      trip_id: i?.trip_id,
      trip_number_id: i?.trip_number_id,
      reverse_trip_id: i?.reverse_trip_id,
      // ===== agency id =====
      agency_id: i?.agency_id,
      agency_name: i?.agency_name,
      // ===== carrier id =====
      carrier_id: i?.carrier_id,
      carrier_name: i?.carrier_name,
      // ===== consolidator id =====
      consolidator_id: i?.consolidator_id,
      consolidator_name: i?.consolidator_name,
      // ===== creator id =====
      creator_id: i?.creator_id,
      creator: i?.creator,
    };
  });
  return dataToFrontEnd;
}
