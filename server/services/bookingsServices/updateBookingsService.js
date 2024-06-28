const { Booking } = require("../../models");

const updateBookingsService = async (req) => {
  const dataList = req.body;

  const updatedDataList = await Promise.all(
    dataList?.map(async (dataItem) => {
      const {
        booking_id,
        buch,
        status,
        passengers_list,
        departure_reverse,
        arrival_reverse,
      } = dataItem ?? {};

      const updatedDataItem = Booking.findByIdAndUpdate(
        booking_id,
        { buch, status, passengers_list, departure_reverse, arrival_reverse },
        { new: true }
      );
      return updatedDataItem;
    })
  );

  return updatedDataList;
};

module.exports = updateBookingsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
    return {
      createdAt: i?.createdAt,
      departure: i?.departure,
      arrival: i?.arrival,
      departure_reverse: i?.departure_reverse,
      arrival_reverse: i?.arrival_reverse,

      passengers_list: i?.passengers_list,
      price: i?.price,
      payment_place: i?.payment_place,
      buch: i?.buch,
      status: i?.status,
      active: i?.active,
      type: i?.type,
      // ===== booking id =====
      _id: i?._id,
      booking_number_id: i?.booking_number_id,
      // ===== direction id =====
      direction_id: i?.direction_id,
      direction_number_id: i?.direction_number_id,
      // ===== trip id =====
      trip_id: i?.trip_id,
      trip_number_id: i?.trip_number_id,
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

// res = await Booking.aggregate([
//   {
//     $lookup: {
//       from: "trips",
//       localField: "trip_id",
//       foreignField: "_id",
//       as: "trip_info",
//     },
//   },
// ]);
