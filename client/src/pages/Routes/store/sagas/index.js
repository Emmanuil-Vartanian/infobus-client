import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { RoutesActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getRoutes, setRoutesToStore } from '../actions'
import { createRouteAPI, deleteRouteAPI, getRoutesAPI } from '../api'
import { getCitiesSelector, getCountriesSelector } from 'pages/Locations/store/reducers/selectors'
import i18n from 'i18n/config'
import { v4 } from 'node-uuid'

export function* getRoutesSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_ROUTES))

    const result = yield call(getRoutesAPI)

    if (result.status === 200) {
      yield put(setRoutesToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_ROUTES))
    }
  } catch (error) {
    const { response } = error
    console.error(RoutesActionTypes.GET_ROUTES, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_ROUTES))
  }
}

function* createLocationSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.CREATE_ROUTE))

    const countries = yield select(getCountriesSelector)
    const cities = yield select(getCitiesSelector)

    const country = dataCountry =>
      countries.find(country => country.country[i18n.language] === dataCountry)
    const city = dataCity => cities.find(city => city.city[i18n.language] === dataCity)

    const points = [
      {
        ...country(data.departure_country),
        city: city(data.departure_city).city,
        point_order: 0,
        point_id: v4()
      },
      ...Object.keys(data)
        .filter(key => key.startsWith('stop_city_'))
        .map((key, index) => ({
          ...country(data[`stop_country_${index + 1}`]),
          city: city(data[key]).city,
          point_order: index + 1,
          point_id: v4()
        })),
      {
        ...country(data.arrival_country),
        city: city(data.arrival_city).city,
        point_order: Object.keys(data).filter(key => key.startsWith('stop_city_')).length + 1,
        point_id: v4()
      }
    ]

    const directions = points.slice(1).map((point, index) => ({
      from: points[index],
      to: point
    }))

    const dataForSend = {
      reverse_route: false,
      departure: points[0],
      arrival: points[points.length - 1],
      directions,
      points
    }

    const request = yield call(createRouteAPI, dataForSend)

    if (request.status === 201) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getRoutes())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_ROUTE))
    }
  } catch (error) {
    const { response } = error
    console.error(RoutesActionTypes.CREATE_ROUTE, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_ROUTE))
  }
}

function* deleteLocationSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const dataForSend = {
      active: false
    }

    const request = yield call(deleteRouteAPI, data._id, dataForSend)

    if (request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getRoutes())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(RoutesActionTypes.DELETE_ROUTE, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(RoutesActionTypes.GET_ROUTES, getRoutesSaga),
    takeLatest(RoutesActionTypes.CREATE_ROUTE, createLocationSaga),
    takeLatest(RoutesActionTypes.DELETE_ROUTE, deleteLocationSaga)
  ])
}
