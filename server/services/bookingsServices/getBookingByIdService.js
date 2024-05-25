const ObjectId = require('mongodb').ObjectId;
const { isAvailableArray } = require('../../helpers/data/isAvailableArray');
const { Booking } = require("../../models");

const getBookingByIdService = async (req) => {
  const { bookingId } = req.params;

  const res = await Booking.aggregate([
    { $match: { _id: new ObjectId(bookingId)}},
    {
      $lookup: {
        from: "trips",
        localField: "trip_id",
        foreignField: "_id",
        as: "trip_info",
      },
    },
    {
      $lookup: {
        from: "trips",
        localField: "reverse_trip_id",
        foreignField: "_id",
        as: "reverse_trip_info",
      },
    },
    {
      $lookup: {
        from: "agencies",
        localField: "agency_id",
        foreignField: "_id",
        as: "agency_info",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator_id",
        foreignField: "_id",
        as: "user_info",
      },
    },
  ]);

  return setDataToFrontEnd(res);
};

module.exports = getBookingByIdService;

function setDataToFrontEnd(res) {
  // return res

  if (!res) return {}
  const { buch, type, payment_place, departure, arrival, price, createdAt, passengers_list, passengers_contact_tel, carrier_name, creator, agency_info, user_info, trip_info, departure_reverse, arrival_reverse, consolidator_id, reverse_trip_info } = res[0];
  const { name, commission } = agency_info[0] ?? {}
  const { user_data } = user_info[0] ?? {}
  const { invoice_text, ticket_text, points } = trip_info[0] ?? {}
  const departureAddressForWeek = points?.find(i => i?.city?.de === departure?.city?.de)?.address_for_week;
  const arrivalAddressForWeek = points?.find(i => i?.city?.de === arrival?.city?.de)?.address_for_week;

  const reverseTripPoints = isAvailableArray(reverse_trip_info)[0]?.points;
  const reverseDepartureAddressForWeek = reverseTripPoints?.find(i => i?.city?.de === departure_reverse?.city?.de)?.address_for_week
  const reverseArrivalAddressForWeek = reverseTripPoints?.find(i => i?.city?.de === arrival_reverse?.city?.de)?.address_for_week
 
  const dataToFrontEnd = {
    res: res[0],
    // booking info
    buch,
    type,
    payment_place,
    departure: {...departure, address_for_week: departureAddressForWeek},
    arrival: {...arrival, address_for_week: arrivalAddressForWeek},
    price,
    createdAt,
    creator,
    invoice_text,
    ticket_text,

    departure_reverse: {...departure_reverse, address_for_week: reverseDepartureAddressForWeek},
    arrival_reverse: {...arrival_reverse, address_for_week: reverseArrivalAddressForWeek},

    // passengers info
    passengers_list,
    passengers_contact_tel,
    // user info
    user_data,
    // agency info
    agency_info: agency_info[0],
    agency_name: name,
    commission: commission?.find(i => i?.carrier_name === carrier_name)?.value,
    // carrier info
    carrier_name,
    consolidator_id,
  }
  
  return dataToFrontEnd;
}