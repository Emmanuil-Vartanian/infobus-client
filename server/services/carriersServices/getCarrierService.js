const { Carrier } = require("../../models");

const getCarrierService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Carrier.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Carrier.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Carrier.aggregate([
        { $match: { active: true } },
        { $match: { consolidator_id: { $exists: true } } },
        { $match: { consolidator_id: req.user._id } },
        { $sort: { createdAt: 1 } },
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getCarrierService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    name: i?.name,
    contact_emails: i?.contact_emails,

    _id: i?._id,
    carrier_number_id: i?.carrier_number_id,

    manager_id: i?.manager_id,
    manager_c: i?.manager_c,
    active: i?.active,

    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,
  }));

  return dataToFrontEnd;
}