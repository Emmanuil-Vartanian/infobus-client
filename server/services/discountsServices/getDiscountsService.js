const { Discount } = require("../../models");

const getDiscountsService = async () => {
  const res = await Discount.aggregate([
    { $match: { active: true } },
    { $sort: { createdAt: 1 } },
  ]);

  const dataToFrontEnd = res?.map((i) => ({
    name: i?.name,
    type: i?.type,
    value: i?.value,
    currency: i?.currency,

    _id: i?._id,
    discount_number_id: i?.discount_number_id,
  }));

  return dataToFrontEnd;
};

module.exports = getDiscountsService;
