const { Transport } = require("../../models");

const createTransportService = async (req) => {
  const { license_plate, color, phone, seats, carrier } = req.body;

  const prevTransport = await Transport.aggregate([
    { $match: { transport_number_id: { $exists: true } } },
    { $sort: { transport_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevTransportNumberId = prevTransport[0]?.transport_number_id;
  const transport_number_id = prevTransportNumberId
    ? prevTransportNumberId + 1
    : 1;

  const newTransport = await Transport.create({
    license_plate, 
    color, 
    phone, 
    seats,
    transport_number_id,
    creator_id: req?.user?.id,
    carrier_id: carrier?._id,
    carrier_name: carrier?.name,
    consolidator_id: carrier?.consolidator_id,
    consolidator_name: carrier?.consolidator_name,
    history: { created: { date: Date.now(), by_id: req?.user?.id } },
  });

  return newTransport
};

module.exports = createTransportService;
