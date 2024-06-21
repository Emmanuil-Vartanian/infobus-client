const { Booking, Trip } = require("../../models");

const getPassengersService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Booking.aggregate([
        { $match: { $expr: { $in: ["$status", ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Booking.aggregate([
        { $match: { $expr: { $in: ["$status", ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user._id } },
        { $match: { $expr: { $in: ["$status", ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "dispatcher":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        { $match: { $expr: { $in: ["$status", ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "carrier_manager":
      res = await Booking.aggregate([
        { $match: { consolidator_id: req.user.consolidator_id } },
        { $match: { $expr: { $in: ["$status", ["confirmed", "paid"]] } } },
        { $sort: { createdAt: -1 } },
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getPassengersService;

async function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => {
    return {
      // res: i,
      departure: i?.departure,
      arrival: i?.arrival,
      departure_reverse: i?.departure_reverse,
      arrival_reverse: i?.arrival_reverse,
      status: i?.status,

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
    };
  });

  const passengersList = dataToFrontEnd?.reduce((prev, i, idx, arr) => {
    let newPrev = [...prev];

    // ===== set passengers_list for current trip
    const currentTripPassList = i?.passengers_list?.map((item) => ({
      buch: i?.buch,

      birth_date: item?.birth_date,
      first_name: item?.first_name,
      last_name: item?.last_name,
      salutation: item?.salutation,
      seat_number: item?.ow_seat_number,
      passport_id: item?.passport_id,
      price: item?.price,
      discount: item?.discount,

      status: i?.status,
      payment_place: i?.payment_place,
      departure: i?.departure,
      arrival: i?.arrival,
      departure_reverse: i?.departure_reverse,
      // main_trip_direction: i?.main_trip_direction,

      passengers_contact_tel: i?.passengers_contact_tel,
      booking_id: i?._id,
      trip_id: i?.trip_id,
    }));

    // ===== check is current trip in list
    const isCurrentTripIn = prev?.find(
      (trip) => trip?.trip_id?.toString() === i?.trip_id?.toString()
    );

    if (!isCurrentTripIn) {
      newPrev = prev.concat([
        {
          trip_id: i?.trip_id,
          departure_dates: [
            { date: i?.departure?.date, passengers_list: currentTripPassList },
          ],
        },
      ]);
    }

    if (isCurrentTripIn) {
      // ===== check is current date in list of current trip
      const isCurrentTripDateIn = isCurrentTripIn?.departure_dates?.find(
        (date) => date?.date === i?.departure?.date
      );
      const isCurrentTripIndex = prev?.findIndex(
        (trip) => trip?.trip_id?.toString() === i?.trip_id?.toString()
      );

      if (!isCurrentTripDateIn) {
        const newDepartureDates = isCurrentTripIn?.departure_dates?.concat([
          { date: i?.departure?.date, passengers_list: currentTripPassList },
        ]);

        newPrev[isCurrentTripIndex] = {
          trip_id: isCurrentTripIn?.trip_id,
          departure_dates: newDepartureDates,
        };
      }

      if (isCurrentTripDateIn) {
        const newDepartureDates = isCurrentTripIn?.departure_dates?.map(
          (date) => {
            if (date?.date === i?.departure?.date)
              return {
                date: date?.date,
                passengers_list:
                  date?.passengers_list?.concat(currentTripPassList),
              };
            return date;
          }
        );

        newPrev[isCurrentTripIndex] = {
          trip_id: isCurrentTripIn?.trip_id,
          departure_dates: newDepartureDates,
        };
      }
    }

    if (i?.type === "rt" && i?.departure_reverse?.date !== "free") {
      // ===== set passengers_list for current trip reverse
      const currentPassListReverse = i?.passengers_list?.map((item) => ({
        buch: i?.buch,

        birth_date: item?.birth_date,
        first_name: item?.first_name,
        last_name: item?.last_name,
        seat_number: item?.rt_seat_number,
        passport_id: item?.passport_id,
        price: item?.price,

        payment_place: i?.payment_place,
        departure: i?.departure_reverse,
        arrival: i?.arrival_reverse,
        // departure_reverse: i?.departure,

        passengers_contact_tel: i?.passengers_contact_tel,
        booking_id: i?._id,
        trip_id: i?.reverse_trip_id,
      }));

      // ===== check is current trip reverse in list
      const isCurrentTripIn = newPrev?.find(
        (trip) => trip?.trip_id?.toString() === i?.reverse_trip_id?.toString()
      );

      if (!isCurrentTripIn) {
        newPrev = newPrev.concat([
          {
            trip_id: i?.reverse_trip_id,
            departure_dates: [
              {
                date: i?.departure_reverse?.date,
                passengers_list: currentPassListReverse,
              },
            ],
          },
        ]);
      }

      if (isCurrentTripIn) {
        // ===== check is current date in list of current trip reverse
        const isCurrentTripDateIn = isCurrentTripIn?.departure_dates?.find(
          (date) => date?.date === i?.departure_reverse?.date
        );
        const isCurrentTripIndex = newPrev?.findIndex(
          (trip) => trip?.trip_id?.toString() === i?.reverse_trip_id?.toString()
        );

        if (!isCurrentTripDateIn) {
          // ===== check is current date in list of current trip reverse
          const newDepartureDates = isCurrentTripIn?.departure_dates?.concat([
            {
              date: i?.departure_reverse?.date,
              passengers_list: currentPassListReverse,
            },
          ]);

          newPrev[isCurrentTripIndex] = {
            trip_id: isCurrentTripIn?.trip_id,
            departure_dates: newDepartureDates,
          };
        }

        if (isCurrentTripDateIn) {
          const newDepartureDates = isCurrentTripIn?.departure_dates?.map(
            (date) => {
              if (date?.date === i?.departure_reverse?.date)
                return {
                  date: date?.date,
                  passengers_list: date?.passengers_list?.concat(
                    currentPassListReverse
                  ),
                };
              return date;
            }
          );

          newPrev[isCurrentTripIndex] = {
            trip_id: isCurrentTripIn?.trip_id,
            departure_dates: newDepartureDates,
          };
        }
      }
    }
    return newPrev;
  }, []);

  const passengersListWithTripData = await Promise.all(
    passengersList?.map(async (tripItem) => {
      const trip = await Trip.find(tripItem?.trip_id);

      const tripItemNewData = {
        trip_number_id: trip[0]?.trip_number_id,
        main_trip_direction: {
          departure: trip[0]?.departure,
          arrival: trip[0]?.arrival,
        },
      };

      return { ...tripItem, ...tripItemNewData };
    })
  );

  // return passengersList
  return passengersListWithTripData;
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
