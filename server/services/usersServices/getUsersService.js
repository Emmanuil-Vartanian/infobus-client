const { User } = require("../../models");

const getUsersService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await User.aggregate([
        { $match: { active: true } },
        { $match: { role: { $nin: ["superadmin"] } } },
        { $sort: { role: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await User.aggregate([
        { $match: { active: true } },
        { $match: { role: { $nin: ["superadmin", "consolidator", "chief", "dispatcher", "carrier_manager"] } } },
        { $sort: { role: -1 } },
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await User.aggregate([
        { $match: { active: true } },
        { $match: { consolidator_id: req.user._id } },
        { $match: { role: { $nin: ["superadmin", "consolidator"] } } },
        { $sort: { role: -1 } },
      ]);
      return setDataToFrontEnd(res);

    default:
      return [];
  }
};

module.exports = getUsersService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    name: i?.name,
    role: i?.role,

    _id: i?._id,
    user_number_id: i?.user_number_id,
    user_c: i?.user_c,
    active: i?.active,

    carrier_id: i?.carrier_id,
    carrier_name: i?.carrier_name,
    agency_id: i?.agency_id,
    agency_name: i?.agency_name,
    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,
  }));

  return dataToFrontEnd;
}
