const catchAsync = require("./catchAsync");
const appError = require("./appError");
const { setHashPassword, comparePassword } = require("./setHashPassword");
const { setUserObjectData } = require("./setUserObjectData");
const getTimeBetweenDates = require("./dateTime/getTimeBetweenDates");
const getDatesBetweenDates = require("./dateTime/getDatesBetweenDates");

// const addTripBusinessDirections = require("./trips/addTripBusinessDirections");
// const addTripDefaultDirections = require("./trips/addTripDefaultDirections");
// const addRouteSchedule = require("./trips/addRouteSchedule");
// const setNewRouteSchedule = require("./trips/setNewRouteSchedule");
const getDateTime = require("./dateTime/getDataTime");
const getDateFromDateTime = require("./dateTime/getDateFromDateTime");
const getTimeFromDateTime = require("./dateTime/getTimeFromDateTime");
const getLocalDate = require("./dateTime/getLocalDate");
const { isAvailableArray } = require("./data/isAvailableArray");
// const createTripCopies = require("./trips/createTripCopies");



module.exports = {
  catchAsync,
  appError,
  setHashPassword,
  comparePassword,
  setUserObjectData,
  getTimeBetweenDates,
  getDatesBetweenDates,
  getDateFromDateTime,
  
  getDateTime,
  getLocalDate,
  getTimeFromDateTime,
  getTimeBetweenDates,
  // data
  isAvailableArray,
  // addTripDefaultDirections,
  // addTripBusinessDirections,
  // addRouteSchedule,
  // setNewRouteSchedule,
  // createTripCopies,
};
