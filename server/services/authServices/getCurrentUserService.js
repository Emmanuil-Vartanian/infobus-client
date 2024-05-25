const getCurrentUserService = async (req) => {
  const dataToFrontEnd = {
    name: req.user?.name,
    token: req.user?.token,
  }

  return dataToFrontEnd;
};

module.exports = getCurrentUserService;
