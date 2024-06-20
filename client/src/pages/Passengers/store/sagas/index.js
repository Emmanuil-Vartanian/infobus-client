import { all, call, put, takeLatest } from 'redux-saga/effects'
import { PassengersActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setPassengersToStore } from '../actions'
import { getPassengersAPI } from '../api'

export function* getBookingsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_PASSENGERS))

    const result = yield call(getPassengersAPI)

    if (result.status === 200) {
      yield put(setPassengersToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_PASSENGERS))
    }
  } catch (error) {
    const { response } = error
    console.error(PassengersActionTypes.GET_PASSENGERS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_PASSENGERS))
  }
}

export default function* root() {
  yield all([takeLatest(PassengersActionTypes.GET_PASSENGERS, getBookingsSaga)])
}
