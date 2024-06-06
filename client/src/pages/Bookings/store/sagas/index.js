import { all, call, put, takeLatest } from 'redux-saga/effects'
import { BookingsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setBookingsToStore, setTicketToStore } from '../actions'
import { getBookingsAPI, getTicketAPI } from '../api'
import { push } from 'redux-first-history'
import { ROUTES } from 'constants/routes'

export function* getBookingsSaga(action) {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_BOOKINGS))

    const result = yield call(getBookingsAPI, action.payload)

    if (result.status === 200) {
      yield put(setBookingsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_BOOKINGS))
    }
  } catch (error) {
    const { response } = error
    console.error(BookingsActionTypes.GET_BOOKINGS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_BOOKINGS))
  }
}

export function* getTicketSaga(action) {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_TICKET))

    const result = yield call(getTicketAPI, action.payload)

    if (result.status === 200) {
      yield put(setTicketToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_TICKET))
    }
  } catch (error) {
    const { response } = error
    if (response.status === 401) {
      yield put(push(ROUTES.LOGIN_PAGE))
    }
    console.error(BookingsActionTypes.GET_TICKET, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_TICKET))
  }
}

export default function* root() {
  yield all([
    takeLatest(BookingsActionTypes.GET_BOOKINGS, getBookingsSaga),
    takeLatest(BookingsActionTypes.GET_TICKET, getTicketSaga)
  ])
}
