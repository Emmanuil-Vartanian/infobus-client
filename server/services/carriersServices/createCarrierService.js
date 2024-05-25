// local
// const { appError, setHashPassword } = require("../../helpers");
const { Carrier, User } = require("../../models");
const { createUserService } = require("../usersServices/index");

const createCarrierService = async (req) => {
  const { name, contact_emails, email, password } = req.body;
  const newReq = {...req, body: {name, email, password, role: "carrier_manager" }  };
  const carrierManager = await createUserService(newReq);

  const prevCarrier = await Carrier.aggregate([
    { $match: { carrier_number_id: { $exists: true } } },
    { $sort: { carrier_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevCarrierNumberId = prevCarrier[0]?.carrier_number_id;
  const carrier_number_id = prevCarrierNumberId ? prevCarrierNumberId + 1 : 1;
  
  // const carrier_number_id = await Carrier.find().count() + 1; // alternative

  let consolidator_id = null;
  let consolidator_name = null;

  if (req.user?.role === "consolidator") { 
    consolidator_id = req.user.id;
    consolidator_name = req.user.name;
  }

  const newCarrier = await Carrier.create({
    name,
    contact_emails,
    manager_id: carrierManager._id,
    manager_c: carrierManager?.user_c,
    creator_id: req.user.id,
    consolidator_id,
    consolidator_name,
    carrier_number_id,
    history: { created: { date: Date.now(), by_id: req.user.id }},
  });

  await User.findByIdAndUpdate( carrierManager._id, { carrier_id: newCarrier._id, carrier_name: newCarrier.short_name, }, { new: true } );

  return newCarrier;
};

module.exports = createCarrierService;
