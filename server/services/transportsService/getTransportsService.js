const { Transport } = require("../../models");

const getTransportsService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Transport.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Transport.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Transport.aggregate([
        { $match: { active: true } },
        { $match: { consolidator_id: req.user._id } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getTransportsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    license_plate: i?.license_plate,
    color: i?.color,
    seats: i?.seats,
    phone: i?.phone,

    _id: i?._id,
    transport_number_id: i?.transport_number_id,

    carrier_id: i?.carrier_id,
    carrier_name: i?.carrier_name,
    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,
  }));

  return dataToFrontEnd;
}
