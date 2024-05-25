const { getDatesBetweenDates, getDateFromDateTime } = require("../../helpers");
const { Booking, Trip } = require("../../models");

const createBookingService = async (req) => {
  const {
    type,
    price,
    passengers_list,
    payment_place,
    departure,
    arrival,
    main_trip_direction,
    passengers_contact_tel,

    consolidator_id,
    consolidator_name,
    carrier_id,
    carrier_name,
   
    direction_id,
    direction_number_id,
    trip_id,
    trip_number_id,

    departure_reverse,
    arrival_reverse,

    reverse_direction_id,
    reverse_direction_number_id,
    reverse_trip_id,
    reverse_trip_number_id,
  } = req.body;

  const prevBooking = await Booking.aggregate([
    { $match: { booking_number_id: { $exists: true } } },
    { $sort: { booking_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevBookingNumberId = prevBooking[0]?.booking_number_id;
  const booking_number_id = prevBookingNumberId ? prevBookingNumberId + 1 : 1;

  const newBooking = await Booking.create({
    type,
    price,
    passengers_list: passengers_list?.map((i) => ({ ...i, price })),
    payment_place,
    departure,
    arrival,
    main_trip_direction,
    passengers_contact_tel,

    consolidator_id,
    consolidator_name,
    carrier_id,
    carrier_name,
    agency_id: req.user?.role === "agency_manager" ? req.user?.agency_id : null,
    agency_name: req.user?.role === "agency_manager" ? req.user?.agency_name : null,

    booking_number_id,
    direction_id,
    direction_number_id,
    trip_id,
    trip_number_id,

    departure_reverse,
    arrival_reverse,

    reverse_direction_id,
    reverse_direction_number_id,
    reverse_trip_id,
    reverse_trip_number_id,

    creator_id: req.user?.id,
    creator: {
      type: req.user?.role,
      name: req.user?.name,
    },
    history: { created: { date: Date.now(), by_id: req.user?.id } },
  });
  
  // ===== 1 STEP | Check is currentTrip with seats_selection
  const currentTrip = await Trip.findById(newBooking?.trip_id);
  if (!currentTrip?.seats_selection) return newBooking;

  let owTripDataToUpdate = [];

  // ===== 2 STEP | Check is arrival date > departure date
  const isArrivalBigerDeparture = arrival?.date > departure?.date
  const owSeatsList = newBooking?.passengers_list?.flatMap(i => i?.ow_seat_number);
  let owBookingDates = [departure?.date]
  if (isArrivalBigerDeparture) owBookingDates = getDatesBetweenDates(departure?.date, arrival?.date)?.map(i => getDateFromDateTime(i));
  
  //  ===== 3 STEP | Check is currentTrip have prevSeatsData
  const prevSeatsData = currentTrip?.seats;

  // ===== 4 STEP | If !prevSeatsData return
  // if (!prevSeatsData || !prevSeatsData?.length) {
  //   owTripDataToUpdate = [...owBookingDates]?.map(i => ({ date: i, booked: [...owSeatsList] }));
  //   await Trip.findByIdAndUpdate( currentTrip._id, { seats: owTripDataToUpdate}, { new: true });
  // }

  // ===== 5 STEP | If prevSeatsData get copy and set
  if (prevSeatsData) {
    const newSeatsData = prevSeatsData?.map(i => {
      if (passengers_list?.find(item => item?.ow_seat_number === i?.seat)) {
        const bookingsList = [...owBookingDates]?.map(date => ({booking_date: date, booking_id: newBooking?._id}))

        const newSeat = {
          ...i,
          booked_dates: [...i?.booked_dates].concat(owBookingDates),
          bookings_list: [...i?.bookings_list].concat(bookingsList),
        }

        return newSeat
      }
      return i
    })

    const updatedTripSeatsData = await Trip.findByIdAndUpdate( currentTrip._id, { seats: newSeatsData}, { new: true });
  }

  if (type === "ow") return
  if (departure_reverse?.date === "free") return

  // ======================================================================
  let rtTripDataToUpdate = [];
  // ===== 6 STEP | Check is currentTripReverse have prevSeatsDataReverse
  const currentTripReverse = await Trip.findById(reverse_trip_id);
  if (!currentTripReverse?.seats_selection) return newBooking;

  // ===== 7 STEP | Check is arrival date > departure date
  const isArrivalBigerDepartureReverse = arrival_reverse?.date > departure_reverse?.date
  const rtSeatsList = newBooking?.passengers_list?.flatMap(i => i?.rt_seat_number);
  let rtBookingDates = [departure_reverse?.date]
  if (isArrivalBigerDepartureReverse) rtBookingDates = getDatesBetweenDates(departure_reverse?.date, arrival_reverse?.date)?.map(i => getDateFromDateTime(i));
 
  //  ===== 8 STEP | Check is currentTripReverse have prevSeatsDataReverse
  const prevSeatsDataReverse = currentTripReverse?.seats

  // ===== 9 STEP | If !prevSeatsDataReverse return
  // if (!prevSeatsDataReverse || !prevSeatsDataReverse?.length) {
  //   rtTripDataToUpdate = [...rtBookingDates]?.map(i => ({date: i, booked: [...rtSeatsList]}));
  //   await Trip.findByIdAndUpdate( currentTripReverse._id, { seats: rtTripDataToUpdate}, { new: true });
  // }
  // ===== 10 STEP | If prevSeatsData get copy and set
  if (prevSeatsDataReverse) {
    const newSeatsData = prevSeatsDataReverse?.map(i => {
      if (passengers_list?.find(item => item?.rt_seat_number === i?.seat)) {
        const bookingsList = [...rtBookingDates]?.map(date => ({ booking_date: date, booking_id: newBooking?._id }))

        const newSeat = {
          ...i,
          booked_dates: [...i?.booked_dates].concat(rtBookingDates),
          bookings_list: [...i?.bookings_list].concat(bookingsList),
        }

        return newSeat
      }
      return i
    })

    const reverseTripBookings = await Trip.findByIdAndUpdate( currentTripReverse._id, { seats: newSeatsData}, { new: true });
  }
  
};

module.exports = createBookingService;
