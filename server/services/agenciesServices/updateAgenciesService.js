const { Agency } = require("../../models");

const updateAgenciesService = async (req) => {
  const dataList = req.body;
 
  const updatedDataList = await Promise.all(
    dataList?.map(async (dataItem) => {
      const { agency_id, commission } = dataItem ?? {}

      const updatedDataItem = Agency.findByIdAndUpdate(agency_id, {commission}, { new: true } );
      return updatedDataItem;
    })
  )


  return updatedDataList
};

module.exports = updateAgenciesService;

function setDataToFrontEnd(res) {
  return res

  const dataToFrontEnd = {

  }
}