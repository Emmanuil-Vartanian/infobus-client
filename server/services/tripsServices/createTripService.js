const { Trip, Direction } = require("../../models");
const createDirectionService = require("../directionsServices/createDirectionService");

const createTripService = async (req) => {
  const { departure, arrival, points, directions, seats_selection, total_duration, prices, discounts, baggage, transport, reverse_trip_departure, reverse_trip_arrival, reverse_trip_points, reverse_trip_directions, reverse_trip_total_duration} = req.body;
  const { _id, carrier_id, carrier_name, license_plate, color, phone, seats, consolidator_id, consolidator_name } = transport ?? {}

  const prevTrip = await Trip.aggregate([
    { $match: { trip_number_id: { $exists: true } } },
    { $sort: { trip_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevTripNumberId = prevTrip[0]?.trip_number_id;
  const trip_number_id = prevTripNumberId
    ? prevTripNumberId + 1
    : 1;

  const target = seats || 51;
  let initSeats = [];
  for (let i = 1; i <= target; i += 1) {
    initSeats.push({ seat: i, booked_dates: [], blocked_dates: [], bookings_list: [], })
  }

  const newTrip = await Trip.create({
    departure, 
    arrival,
    points,
    directions,
    total_duration,
    prices,
    discounts,
    baggage,
    seats_selection,
    seats_count: seats,
    seats: initSeats,
    transport: { _id, license_plate, color, phone, seats },

    trip_number_id,

    carrier_id,
    carrier_name,
    consolidator_id,
    consolidator_name,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });
  const newTripReverse = await Trip.create({
    departure: reverse_trip_departure,
    arrival: reverse_trip_arrival,
    points: reverse_trip_points,
    directions: reverse_trip_directions,
    total_duration: reverse_trip_total_duration,
    prices,
    discounts,
    baggage,
    seats_selection,
    seats_count: seats,
    seats: initSeats,
    transport: { _id, license_plate, color, phone, seats },

    trip_number_id: newTrip?.trip_number_id + 1,
    reverse_trip_number_id: newTrip?.trip_number_id,
    reverse_trip_id: newTrip.id,

    carrier_id,
    carrier_name,
    consolidator_id,
    consolidator_name,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });

  await Trip.findByIdAndUpdate( 
    newTrip._id, 
    { reverse_trip_number_id: newTripReverse?.trip_number_id, reverse_trip_id: newTripReverse.id, }, 
    { new: true } );

  const prevDirection = await Direction.aggregate([
    { $match: { direction_number_id: { $exists: true } } },
    { $sort: { direction_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevDirectionNumberId = prevDirection?.length && prevDirection[0]?.direction_number_id;

  const newDirections = await Promise.all(
      newTrip?.directions?.map(async (direction) => {
      const newReq = {...req, body: {
        departure: direction?.departure,
        arrival: direction?.arrival,
        main_trip_direction: {
          departure: newTrip?.departure,
          arrival: newTrip?.arrival,
        },
        duration: direction?.duration,
        dfb_order: direction?.dfb_order,
        prices: newTrip?.prices,

        trip_id: newTrip?.id,
        trip_number_id,
        reverse_trip_id: newTripReverse?.id,
        reverse_trip_number_id: trip_number_id + 1,
        carrier_id: newTrip?.carrier_id,
        carrier_name: newTrip?.carrier_name,
        consolidator_id: newTrip?.consolidator_id,
        consolidator_name: newTrip?.consolidator_name,
        creator_id: newTrip?.creator_id,
      }};
      const newDirection = await createDirectionService(newReq);

      return {
        dfb_order: newDirection?.dfb_order,
        // direction_number_id: newDirection?.direction_number_id,
        _id: newDirection?._id,
      }
    })
  );
  const updNewDirections = await Promise.all(
    newDirections?.map(async (direction, index) => {
      const updDirection = await Direction.findByIdAndUpdate(
        direction._id,
        { direction_number_id: prevDirectionNumberId + 1 + index},
        { new: true }
      );

      return {
        dfb_order: updDirection?.dfb_order,
        direction_number_id: updDirection?.direction_number_id,
        direction_id: updDirection?._id,
      }
    })
  )
  const newDirectionsReverse = await Promise.all(
    newTripReverse?.directions?.map(async (direction) => {
      const newReq = {...req, body: {
        departure: direction?.departure,
        arrival: direction?.arrival,
        main_trip_direction: {
          departure: newTripReverse?.departure,
          arrival: newTripReverse?.arrival,
        },
        duration: direction?.duration,
        dfb_order: direction?.dfb_order,
        prices: newTripReverse?.prices,

        trip_id: newTripReverse?.id,
        trip_number_id:   trip_number_id + 1,
        reverse_trip_id: newTrip?.id,
        reverse_trip_number_id: trip_number_id,

        carrier_id: newTripReverse?.carrier_id,
        carrier_name: newTripReverse?.carrier_name,
        consolidator_id: newTripReverse?.consolidator_id,
        consolidator_name: newTripReverse?.consolidator_name,
        creator_id: newTripReverse?.creator_id,
      }};
      const newDirection = await createDirectionService(newReq);

      return {
        dfb_order: newDirection?.dfb_order,
        // direction_number_id: newDirection?.direction_number_id,
        _id: newDirection?._id,
      }
    })
  );
  const updNewDirectionsReverse = await Promise.all(
    newDirectionsReverse?.map(async (direction, index) => {
      const updDirection = await Direction.findByIdAndUpdate(
        direction._id,
        { direction_number_id: prevDirectionNumberId + 1 + index + updNewDirections?.length},
        { new: true }
      );

      return {
        dfb_order: updDirection?.dfb_order,
        direction_number_id: updDirection?.direction_number_id,
        direction_id: updDirection?._id,
      }
    })
  )

  const newTripWithDirectionsIds = await Trip.findByIdAndUpdate( 
    newTrip._id, 
    { directions: newTrip?.directions?.map(i => {
      const currentItemIdx = updNewDirections?.findIndex(item => item?.dfb_order === i?.dfb_order);

      const newDirection = {
        ...i,
        ...updNewDirections[currentItemIdx],
      }

      return newDirection
    })}, 
    { new: true } );

  const newTripReverseWithDirectionsIds = await Trip.findByIdAndUpdate( 
    newTripReverse._id, 
    { directions: newTripReverse?.directions?.map(i => {
      const currentItemIdx = updNewDirectionsReverse?.findIndex(item => item?.dfb_order === i?.dfb_order);

      const newDirection = {
        ...i,
        ...updNewDirectionsReverse[currentItemIdx],
      }

      return newDirection
    })}, 
    { new: true } );
  
  return {
    trip_number_id: newTrip?.trip_number_id,
    trip_directions_ids: updNewDirections,

    reverse_trip_number_id: newTripReverse.trip_number_id,
    reverse_trip_directions_ids: updNewDirectionsReverse,
  }
};

module.exports = createTripService;
