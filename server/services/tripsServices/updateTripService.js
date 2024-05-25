const { Trip } = require("../../models");

const updateTripService = async (req) => {
  const { tripId } = req.params;

  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    { ...req.body },
    { new: true }
  );

  const historyUpdData = {
    date: new Date().toISOString(),
    by_id: req.user.id,
    // data: Object.keys(req.body),
    data: req.body.updated,
  }

  await Trip.findByIdAndUpdate(
    tripId,
    { history: {
        ...updatedTrip?.history,
        updated: { ...historyUpdData, list: [...updatedTrip?.history?.updated?.list, historyUpdData],
        }
      }
    },
    { new: true }
  );

  return setDataToFrontEnd(updatedTrip)
}

module.exports = updateTripService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = {
    departure: res?.departure,
    arrival: res?.arrival,
    points: res?.points,
    directions: res?.directions,
    total_duration: res?.total_duration,

    prices: res?.prices,
    discounts: res?.discounts,
    baggage: res?.baggage,
    invoice_text: res?.invoice_text,
    ticket_text: res?.ticket_text,
    transport: res?.transport,
    seats_selection: res?.seats_selection,
    seats: res?.seats,

    active: res?.active,
    direct: res?.direct,
    stops: res?.stops,
    
    _id: res?._id,
    trip_number_id: res?.trip_number_id,
    reverse_trip_id: res?.reverse_trip_id,
    reverse_trip_number_id: res?.reverse_trip_number_id,
    
    carrier_id: res?.carrier_id,
    carrier_name: res?.carrier_name,
    consolidator_id: res?.consolidator_id,
    consolidator_name: res?.consolidator_name,
  }
  return dataToFrontEnd;
}