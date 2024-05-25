const { Location } = require("../../models");

const getCitiesService = async () => {
  return await Location.aggregate([
    {
      $group: {
        _id: "$country",
        city: { $addToSet: "$city" },
      },
    },
    { $unwind: "$city" },
    { $project: { "country": "$_id", "_id": 0, "city": 1 } },
    { $sort: { "city.de": 1 } },
  ]);
};
// const getCitiesService = async () => {
//   return await Location.aggregate([
//     {
//       $group: {
//         _id: "$_id",
//         city: { $addToSet: "$city" },
//         country: { $first: "$country" },
//       },
//     },
//     { $unwind: "$city" },
//     { $project: { _id: 0 } },
//     { $sort: { "city.de": 1 } },
//   ]);
// };
// const getCitiesService = async () => {
//   return await Location.aggregate([
//     { $group: { _id: null, city: { $addToSet: "$city" }}},
//     { $unwind: "$city" },
//     { $project: { _id: 0 } },
//     { $sort: { "city.de": 1 } },
//   ]);
// };

module.exports = getCitiesService;
