import { all, fork } from 'redux-saga/effects'

import AuthSaga from 'pages/Login/store/sagas'
import LocationsSaga from 'containers/Dictionaries/Locations/store/sagas'
import TripSaga from 'pages/TripSearch/store/sagas'

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(LocationsSaga), fork(TripSaga)])
}
