const getCurrentUserService = async (req) => {
  const dataToFrontEnd = {
    name: req.user?.name,
    role: req.user?.role,
    token: req.user?.token,
  };

  return dataToFrontEnd;
};

module.exports = getCurrentUserService;
