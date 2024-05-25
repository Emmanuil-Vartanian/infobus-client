const { Baggage } = require("../../models");

const getBaggageService = async (req) => {
  const res = await Baggage.aggregate([
    { $match: { active: true } },
    { $sort: { createdAt: 1 } }
  ]);
  
  const dataToFrontEnd = res?.map(i => ({
    name: i?.name,
    type: i?.type,
    value: i?.value,
    units: i?.units,

    _id: i?._id,
    baggage_number_id: i?.baggage_number_id,
  }))

  return dataToFrontEnd;
};

module.exports = getBaggageService;
