const { User } = require("../../models");

const updateUserByIdService = async (req) => {
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...req.body },
    { new: true }
  );

  return "delete";
};
module.exports = updateUserByIdService;
