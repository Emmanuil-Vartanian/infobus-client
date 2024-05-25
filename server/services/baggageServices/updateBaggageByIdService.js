const { Baggage } = require("../../models");

const updateBaggageByIdService = async (req) => {
  const { baggageId } = req.params;

  const updatedBaggage = await Baggage.findByIdAndUpdate(
    baggageId,
    { ...req.body },
    { new: true }
  );

  return updatedBaggage;
}
module.exports = updateBaggageByIdService;