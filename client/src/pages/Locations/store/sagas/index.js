import { all, call, put, takeLatest } from 'redux-saga/effects'
import { LocationsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setCitiesToStore, setLocationsToStore } from '../actions'
import { getCitiesAPI, getLocationsAPI } from '../api'

export function* getLocationsSaga(action) {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_LOCATIONS))

    const result = yield call(getLocationsAPI, action.payload)

    if (result.status === 200) {
      yield put(setLocationsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_LOCATIONS))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.GET_LOCATIONS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_LOCATIONS))
  }
}

function* getCitiesSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_CITIES))

    const request = yield call(getCitiesAPI)

    if (request.status === 200) {
      yield put(setCitiesToStore(request.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_CITIES))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.GET_CITIES, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_CITIES))
  }
}

export default function* root() {
  yield all([
    takeLatest(LocationsActionTypes.GET_LOCATIONS, getLocationsSaga),
    takeLatest(LocationsActionTypes.GET_CITIES, getCitiesSaga)
  ])
}
