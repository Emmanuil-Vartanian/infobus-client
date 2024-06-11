import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TripsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setTripsToStore } from '../actions'
import { getTripsAPI } from '../api'

export function* getTripsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_TRIPS))

    const result = yield call(getTripsAPI)

    if (result.status === 200) {
      yield put(setTripsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_TRIPS))
    }
  } catch (error) {
    const { response } = error
    console.error(TripsActionTypes.GET_TRIPS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_TRIPS))
  }
}

export default function* root() {
  yield all([takeLatest(TripsActionTypes.GET_TRIPS, getTripsSaga)])
}
