import { all, call, put, takeLatest } from 'redux-saga/effects'

import { LocationActionTypes } from '../types'
import { getCitiesAPI } from '../api'
import { setLocationsToStore } from '../actions'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'

function* getCitiesSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_CITIES))

    const request = yield call(getCitiesAPI)

    if (request.status === 200) {
      yield put(setLocationsToStore(request.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_CITIES))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationActionTypes.GET_CITIES.GET_COUNTRIES, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_CITIES))
  }
}

export default function* root() {
  yield all([takeLatest(LocationActionTypes.GET_CITIES, getCitiesSaga)])
}
