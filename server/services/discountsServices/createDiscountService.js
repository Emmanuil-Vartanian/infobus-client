const { Discount } = require("../../models");

const createDiscountService = async (req) => {
  const { name, type, value, currency } = req.body;

  const prevDiscount = await Discount.aggregate([
    { $match: { discount_number_id: { $exists: true } } },
    { $sort: { discount_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevDiscountNumberId = prevDiscount[0]?.discount_number_id;
  const discount_number_id = prevDiscountNumberId
    ? prevDiscountNumberId + 1
    : 1;

  const newDiscount = await Discount.create({
    name, 
    type, 
    value, 
    currency,
    discount_number_id,
    creator_id: req.user.id,
    history: { created: { date: Date.now(), by_id: req.user.id } },
  });

  return newDiscount;
};

module.exports = createDiscountService;
