const { Carrier } = require("../../models");

const updateCarrierByIdService = async (req) => {
  const { carrierId } = req.params;

  const updatedCarrier = await Carrier.findByIdAndUpdate(
    carrierId,
    { ...req.body },
    { new: true }
  );

  return updatedCarrier;
}
module.exports = updateCarrierByIdService;