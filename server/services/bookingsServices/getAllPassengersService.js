const { Booking } = require("../../models");

const getAllPassengersService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Booking.aggregate([
        { $match: { $expr: { $in: ['$status', ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Booking.aggregate([
        { $match: { $expr: { $in: ['$status', ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } }
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user._id } },
        { $match: { $expr: { $in: ['$status', ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } }
      ]);
      return setDataToFrontEnd(res);

    case "dispatcher":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        { $match: { $expr: { $in: ['$status', ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } }
      ]);
      return setDataToFrontEnd(res);

    case "carrier_manager":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        { $match: { $expr: { $in: ['$status', ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } }
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getAllPassengersService;

async function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
    return {
      // res: i,
      departure: i?.departure,
      arrival: i?.arrival,
      departure_reverse: i?.departure_reverse,
      arrival_reverse: i?.arrival_reverse,

      passengers_list: i?.passengers_list,
      passengers_contact_tel: i?.passengers_contact_tel,
      price: i?.price,
      payment_place: i?.payment_place,
      buch: i?.buch,
      type: i?.type,
      // ===== booking id =====
      _id: i?._id,
      // ===== trip id =====
      trip_id: i?.trip_id,
      reverse_trip_id: i?.reverse_trip_id,
      main_trip_direction: i?.main_trip_direction,
      carrier_name: i?.carrier_name,
    };
  });

  return dataToFrontEnd
}

