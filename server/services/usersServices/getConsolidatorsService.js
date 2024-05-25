const { User } = require("../../models");

const getConsolidatorsService = async (req) => {
  const res = await User.aggregate([
    { $match: { role: "consolidator" } },
    { $sort: { role: -1 } },
  ]);
  return setDataToFrontEnd(res);

};

module.exports = getConsolidatorsService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    name: i?.name,
    // role: i?.role,
    _id: i?._id,
  }));

  return dataToFrontEnd;
}
