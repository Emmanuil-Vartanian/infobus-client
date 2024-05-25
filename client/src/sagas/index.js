import { all, fork } from 'redux-saga/effects'

import AuthSaga from 'pages/Login/store/sagas'

export default function* rootSaga() {
  yield all([fork(AuthSaga)])
}
