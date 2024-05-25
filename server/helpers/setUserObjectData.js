const setUserObjectData = function (userDataFromDB) {
  const { token, email, role, permissions, name = null } = userDataFromDB;
  return { token, name };
};

module.exports = {
  setUserObjectData,
};
