import { all, call, put, takeLatest } from 'redux-saga/effects'
import { CarriersActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getCarriersAPI } from '../api'
import { setCarriersToStore } from '../actions'

export function* getAgenciesSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_CARRIERS))

    const result = yield call(getCarriersAPI)

    if (result.status === 200) {
      yield put(setCarriersToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_CARRIERS))
    }
  } catch (error) {
    const { response } = error
    console.error(CarriersActionTypes.GET_CARRIERS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_CARRIERS))
  }
}

export default function* root() {
  yield all([takeLatest(CarriersActionTypes.GET_CARRIERS, getAgenciesSaga)])
}
