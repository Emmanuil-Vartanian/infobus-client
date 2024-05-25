const { Agency } = require("../../models");

const updateAgencyByIdService = async (req) => {
  const { agencyId } = req.params;

  const updatedAgency = await Agency.findByIdAndUpdate(
    agencyId,
    { ...req.body },
    { new: true }
  );

  return updatedAgency;
}
module.exports = updateAgencyByIdService;