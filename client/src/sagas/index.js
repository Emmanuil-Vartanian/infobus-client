import { all, fork } from 'redux-saga/effects'

import AuthSaga from 'pages/Login/store/sagas'
import TripSaga from 'pages/TripSearch/store/sagas'
import BookingsSaga from 'pages/Bookings/store/sagas'
import TripsSaga from 'pages/Trips/store/sagas'
import PassengersSaga from 'pages/Passengers/store/sagas'
import LocationsSaga from 'pages/Locations/store/sagas'
import AgenciesSaga from 'pages/Agencies/store/sagas'
import UsersSaga from 'pages/Users/store/sagas'
import CarriersSaga from 'pages/Carriers/store/sagas'

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LocationsSaga),
    fork(TripSaga),
    fork(BookingsSaga),
    fork(TripsSaga),
    fork(PassengersSaga),
    fork(AgenciesSaga),
    fork(UsersSaga),
    fork(CarriersSaga)
  ])
}
