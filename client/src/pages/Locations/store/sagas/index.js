import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { LocationsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import {
  getLocations,
  setCitiesToStore,
  setCountriesToStore,
  setLocationsToStore
} from '../actions'
import {
  changeLocationAPI,
  createLocationAPI,
  deleteLocationAPI,
  getCitiesAPI,
  getCitiesByCountryAPI,
  getCountriesAPI,
  getLocationsAPI
} from '../api'
import { getCitiesSelector, getCountriesSelector } from '../reducers/selectors'
import i18n from 'i18n/config'

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

function* getCountriesSaga() {
  try {
    const request = yield call(getCountriesAPI)

    if (request.status === 200) {
      yield put(setCountriesToStore(request.data))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.GET_COUNTRIES, response)
  }
}

function* getCitiesByCountySaga(action) {
  try {
    const countries = yield select(getCountriesSelector)

    const findCountry = countries.find(country => country.country[i18n.language] === action.payload)

    const request = yield call(getCitiesByCountryAPI, findCountry)

    if (request.status === 200) {
      yield put(setCitiesToStore(request.data))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.GET_COUNTRIES, response)
  }
}

function* createLocationSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.CREATE_LOCATION))

    const countries = yield select(getCountriesSelector)
    const cities = yield select(getCitiesSelector)

    const country = countries.find(country => country.country[i18n.language] === data.country)
    const city = cities.find(city => city.city[i18n.language] === data.city)

    const dataForSend = {
      ...country,
      ...city,
      address: {
        de: data.address_de,
        ru: data.address_ru,
        ua: data.address_ua
      },
      name: {
        de: data.name_de,
        ru: data.name_ru,
        ua: data.name_ua
      }
    }

    let request

    if (data?._id) {
      request = yield call(changeLocationAPI, data._id, dataForSend)
    } else {
      request = yield call(createLocationAPI, dataForSend)
    }

    if (request.status === 201 || request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getLocations())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_LOCATION))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.CREATE_LOCATION, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_LOCATION))
  }
}

function* deleteLocationSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const dataForSend = {
      ...data,
      active: false
    }

    const request = yield call(deleteLocationAPI, dataForSend)

    if (request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getLocations())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(LocationsActionTypes.DELETE_LOCATION, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(LocationsActionTypes.GET_LOCATIONS, getLocationsSaga),
    takeLatest(LocationsActionTypes.GET_CITIES, getCitiesSaga),
    takeLatest(LocationsActionTypes.GET_COUNTRIES, getCountriesSaga),
    takeLatest(LocationsActionTypes.GET_CITIES_BY_COUNTRY, getCitiesByCountySaga),
    takeLatest(LocationsActionTypes.CREATE_LOCATION, createLocationSaga),
    takeLatest(LocationsActionTypes.DELETE_LOCATION, deleteLocationSaga)
  ])
}
