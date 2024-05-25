const { Route } = require("../../models");

const updateRouteByIdService = async (req) => {
  const { routeId } = req.params;

  const updatedRoute = await Route.findByIdAndUpdate(
    routeId,
    { ...req.body },
    { new: true }
  );

  return {_id: updatedRoute?._id, active: updatedRoute?.active};
};
module.exports = updateRouteByIdService;
