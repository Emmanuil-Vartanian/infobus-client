// const { Trip } = require("../../models");

// const getTripsBySearchQueryService = async (req) => {
//   const { departure, arrival } = req.body;
//   const res = await Trip.aggregate([
//     {
//       $match: {
//         directions: {
//           $exists: true,
//           $elemMatch: {
//             "departure.city.de": departure?.city?.de,
//             "arrival.city.de": arrival?.city?.de,
//           },
//         },
//       },
//     },
//     { $sort: { createdAt: 1 } },
//   ]);
//   return res
// };

// module.exports = getTripsBySearchQueryService;

// function setDataToFrontEnd(res) {
//   const dataToFrontEnd = res?.map((i) => ({
//     departure: i?.departure,
//     arrival: i?.arrival,
//     points: i?.points,
//     directions: i?.directions,
//     total_duration: i?.total_duration,
//   }));

//   return dataToFrontEnd;
// }

// function setDataToFrontEnd(res) {
//   const dataToFrontEnd = res?.map((i) => {
//     const filteredDirection = i?.directions?.filter(
//       (item) =>
//         item?.departure?.city?.de === departure?.city?.de &&
//         item?.arrival?.city?.de === arrival?.city?.de
//     )[0];

//     const newDeparture = {
//       ...filteredDirection?.departure,
//       days_of_week: i?.departure?.days_of_week,
//     };
//     const newArrival = {
//       ...filteredDirection?.arrival,
//       days_of_week: i?.arrival?.days_of_week,
//     };

//     return {
//       departure: newDeparture,
//       arrival: newArrival,
//       total_duration: filteredDirection?.duration,

//       // directions: i?.directions,

//       prices: i?.prices,
//       discounts: i?.discounts,
//       baggage: i?.baggage,
//       transport: i?.transport,

//       // active: i?.active,
//       direct: i?.direct,
//       stops: i?.stops,

//       main_trip_direction: {
//         departure: i?.departure,
//         arrival: i?.arrival,
//       },

//       _id: i?._id,
//       trip_number_id: i?.trip_number_id,
//       reverse_trip_id: i?.reverse_trip_id,
//       reverse_trip_number_id: i?.reverse_trip_number_id,

//       carrier_id: i?.carrier_id,
//       carrier_name: i?.carrier_name,
//       consolidator_id: i?.consolidator_id,
//       consolidator_name: i?.consolidator_name,
//     };
//   });

//   return dataToFrontEnd;
// }

// setDataToFrontEnd(res);

// const dataToFrontEnd = res?.map((i) => {
//   const filteredDirection = i?.directions?.filter(
//     (item) =>
//       item?.departure?.city?.de === departure?.city?.de &&
//       item?.arrival?.city?.de === arrival?.city?.de
//   )[0];

//   const newDeparture = {
//     ...filteredDirection?.departure,
//     days_of_week: i?.departure?.days_of_week,
//   };
//   const newArrival = {
//     ...filteredDirection?.arrival,
//     days_of_week: i?.arrival?.days_of_week,
//   };

//   return {
//     departure: newDeparture,
//     arrival: newArrival,
//     total_duration: filteredDirection?.duration,

//     // directions: i?.directions,

//     prices: i?.prices,
//     discounts: i?.discounts,
//     baggage: i?.baggage,
//     transport: i?.transport,

//     // active: i?.active,
//     direct: i?.direct,
//     stops: i?.stops,

//     main_trip_direction: {
//       departure: i?.departure,
//       arrival: i?.arrival,
//     },

//     _id: i?._id,
//     trip_number_id: i?.trip_number_id,
//     reverse_trip_id: i?.reverse_trip_id,
//     reverse_trip_number_id: i?.reverse_trip_number_id,

//     carrier_id: i?.carrier_id,
//     carrier_name: i?.carrier_name,
//     consolidator_id: i?.consolidator_id,
//     consolidator_name: i?.consolidator_name,
//   };
// });

// return dataToFrontEnd;
