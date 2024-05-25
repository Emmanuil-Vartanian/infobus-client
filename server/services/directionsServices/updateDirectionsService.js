const { Direction } = require("../../models");

const updateDirectionsService = async (req) => {
  const dataList = req.body;

  const updatedDataList = await Promise.all(
    dataList?.map(async (dataItem) => {
      const { direction_id, active } = dataItem ?? {}

      const updatedDataItem = Direction.findByIdAndUpdate(direction_id, { active }, { new: true } );
      return updatedDataItem;
    })
  )

  return updatedDataList
}

module.exports = updateDirectionsService;
