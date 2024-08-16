import { all, call, put, takeLatest } from 'redux-saga/effects'
import { BaggageActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { changeBaggageAPI, createBaggageAPI, deleteBaggageAPI, getBaggageAPI } from '../api'
import { getBaggage, setBaggageToStore } from '../actions'

export function* getDiscountsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_BAGGAGE))

    const result = yield call(getBaggageAPI)

    if (result.status === 200) {
      yield put(setBaggageToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_BAGGAGE))
    }
  } catch (error) {
    const { response } = error
    console.error(BaggageActionTypes.GET_BAGGAGE, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_BAGGAGE))
  }
}

function* createBaggageSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.CREATE_BAGGAGE))

    const dataForSend = {
      ...data,
      name: {
        de: data.name_de,
        ru: data.name_ru,
        ua: data.name_ua
      }
    }

    let request

    if (data?._id) {
      request = yield call(changeBaggageAPI, dataForSend)
    } else {
      request = yield call(createBaggageAPI, dataForSend)
    }

    if (request.status === 201 || request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getBaggage())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_BAGGAGE))
    }
  } catch (error) {
    const { response } = error
    console.error(BaggageActionTypes.CREATE_BAGGAGE, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_BAGGAGE))
  }
}

function* deleteBaggageSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const dataForSend = {
      ...data,
      active: false
    }

    const request = yield call(deleteBaggageAPI, dataForSend)

    if (request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getBaggage())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(BaggageActionTypes.DELETE_BAGGAGE, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(BaggageActionTypes.GET_BAGGAGE, getDiscountsSaga),
    takeLatest(BaggageActionTypes.CREATE_BAGGAGE, createBaggageSaga),
    takeLatest(BaggageActionTypes.DELETE_BAGGAGE, deleteBaggageSaga)
  ])
}
