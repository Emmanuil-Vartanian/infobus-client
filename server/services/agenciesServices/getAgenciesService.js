const { Agency } = require("../../models");

const getAgenciesService = async (req) => {
  let res = [];

  switch (req?.user?.role) {
    case "superadmin":
      res = await Agency.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "chief":
      res = await Agency.aggregate([
        { $match: { active: true } },
        { $sort: { createdAt: 1 } }
      ]);
      return setDataToFrontEnd(res);

    case "consolidator":
      res = await Agency.aggregate([
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

module.exports = getAgenciesService;

function setDataToFrontEnd(res) {
  const dataToFrontEnd = res?.map((i) => ({
    name: i?.name,
    short_name: i?.short_name,
    street: i?.street,
    postal_code: i?.postal_code,
    city: i?.city,
    tax: i?.tax,
    enterprise_status: i?.enterprise_status,
    enterprise_owner: i?.enterprise_owner,
    contact_tel: i?.contact_tel,
    contact_fax: i?.contact_fax,
    contact_email: i?.contact_email,
    commission: i?.commission,

    _id: i?._id,
    agency_number_id: i?.agency_number_id,

    manager_id: i?.manager_id,
    manager_c: i?.manager_c,
    active: i?.active,
    
    consolidator_id: i?.consolidator_id,
    consolidator_name: i?.consolidator_name,
  }));

  return dataToFrontEnd;
}
