const { Location } = require("../../models");

const addLocationDistanceService = async (req) => {
  const dataList = req.body;

  let consolidator_id = null;
  let consolidator_name = null;

  if (req.user?.role === "consolidator") { 
    consolidator_id = req.user.id;
    consolidator_name = req.user.name;
  }
 
  const updatedDataList = await Promise.all(
    dataList?.map(async (dataItem) => {
      const { _id, country, city, distance } = dataItem ?? {}

      let newLocation = {}

      if (_id) newLocation = await Location.findByIdAndUpdate(_id, { distance }, { new: true } );
      if (!_id) newLocation = await Location.create({
        country,
        city,
        distance,
        creator_id: req.user.id,
        consolidator_id,
        consolidator_name,
      });

      return {
        _id: newLocation?._id,
        country: newLocation?.country,
        city: newLocation?.city,
        distance: newLocation?.distance,
      };
    })
  )

  return updatedDataList
};

module.exports = addLocationDistanceService;
