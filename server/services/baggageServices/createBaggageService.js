const { Baggage } = require("../../models");

const createBaggageService = async (req) => {
  const { name, type, value, units } = req.body;

  const prevBaggage = await Baggage.aggregate([
    { $match: { baggage_number_id: { $exists: true } } },
    { $sort: { baggage_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevBaggageNumberId = prevBaggage[0]?.baggage_number_id;
  const baggage_number_id = prevBaggageNumberId
    ? prevBaggageNumberId + 1
    : 1;

  const newBaggage = await Baggage.create({
    name, 
    type, 
    value, 
    units,
    baggage_number_id,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });

  return newBaggage;
};

module.exports = createBaggageService;
