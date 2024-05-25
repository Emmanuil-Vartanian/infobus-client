// local
const { appError, setHashPassword } = require("../../helpers");
const { Agency, User } = require("../../models");
const { createUserService } = require("../usersServices/index");

const createAgencyService = async (req) => {
  const { name, short_name, street, postal_code, city, contact_tel, contact_fax, contact_email, tax, enterprise_status, enterprise_owner, email, password } = req.body;
  const newReq = {...req, body: {name, email, password, role: "agency_manager" }  };
  const agencyManager = await createUserService(newReq);

  const prevAgency = await Agency.aggregate([
    { $match: { agency_number_id: { $exists: true } } },
    { $sort: { agency_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevAgencyNumberId = prevAgency[0]?.agency_number_id;
  const agency_number_id = prevAgencyNumberId ? prevAgencyNumberId + 1 : 1;
  
  let consolidator_id = null;
  let consolidator_name = null;

  if (req.user?.role === "consolidator") { 
    consolidator_id = req.user.id;
    consolidator_name = req.user.name;
  }

   const newAgency = await Agency.create({
    name,
    short_name,
    street,
    postal_code,
    city,
    contact_tel,
    contact_fax,
    contact_email,
    tax,
    enterprise_status,
    enterprise_owner,
    manager_id: agencyManager._id,
    manager_c: agencyManager?.user_c,
    creator_id: req.user.id,
    consolidator_id,
    consolidator_name,
    agency_number_id,
    history: { created: { date: Date.now(), by_id: req.user.id }},
  });

  await User.findByIdAndUpdate( agencyManager._id, { agency_id: newAgency._id, agency_name: newAgency.short_name, }, { new: true } );

  return newAgency;
};

module.exports = createAgencyService;
