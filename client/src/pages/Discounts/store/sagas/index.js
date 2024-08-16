import { all, call, put, takeLatest } from 'redux-saga/effects'
import { DiscountsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { changeDiscountAPI, createDiscountAPI, deleteDiscountAPI, getDiscountsAPI } from '../api'
import { getDiscounts, setDiscountsToStore } from '../actions'

export function* getDiscountsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_DISCOUNTS))

    const result = yield call(getDiscountsAPI)

    if (result.status === 200) {
      yield put(setDiscountsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_DISCOUNTS))
    }
  } catch (error) {
    const { response } = error
    console.error(DiscountsActionTypes.GET_DISCOUNTS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_DISCOUNTS))
  }
}

function* createDiscountSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.CREATE_DISCOUNT))

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
      request = yield call(changeDiscountAPI, dataForSend)
    } else {
      request = yield call(createDiscountAPI, dataForSend)
    }

    if (request.status === 201 || request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getDiscounts())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_DISCOUNT))
    }
  } catch (error) {
    const { response } = error
    console.error(DiscountsActionTypes.CREATE_DISCOUNT, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_DISCOUNT))
  }
}

function* deleteDiscountSaga(action) {
  try {
    const { data, closeModal } = action.payload

    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const dataForSend = {
      ...data,
      active: false
    }

    const request = yield call(deleteDiscountAPI, dataForSend)

    if (request.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getDiscounts())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(DiscountsActionTypes.DELETE_DISCOUNT, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(DiscountsActionTypes.GET_DISCOUNTS, getDiscountsSaga),
    takeLatest(DiscountsActionTypes.CREATE_DISCOUNT, createDiscountSaga),
    takeLatest(DiscountsActionTypes.DELETE_DISCOUNT, deleteDiscountSaga)
  ])
}
