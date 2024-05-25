const { Transport } = require("../../models");

const updateTransportByIdService = async (req) => {
  const { transportId } = req.params;

  const updatedTransport = await Transport.findByIdAndUpdate(
    transportId,
    { ...req.body },
    { new: true }
  );

  return updatedTransport;
};
module.exports = updateTransportByIdService;
