import { all, call, put, takeLatest } from 'redux-saga/effects'
import { BookingsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getBookings, setBookingsToStore, setTicketToStore } from '../actions'
import { changeBookingsAPI, getBookingsAPI, getTicketAPI } from '../api'
import { push } from 'redux-first-history'
import { ROUTES } from 'constants/routes'
import moment from 'moment'
import { SEND_DATE_FORMAT } from 'constants/dateFormat'

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

export function* changeBookingsSaga(action) {
  const { data, handleCloseModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.CHANGE_BOOKINGS))

    const changeReverseDepartureData =
      data.departure_reverse && data?.returnDate
        ? {
            arrival_reverse: {
              ...data.arrival_reverse,
              date: moment(data.returnDate).add(1, 'day').format(SEND_DATE_FORMAT)
            },
            departure_reverse: { ...data.departure_reverse, date: data.returnDate },
            passengers_list: data.passengers_list
          }
        : {}
    const dataToSend = [
      {
        booking_id: data._id,
        buch: data.buch,
        status: data.status,
        ...changeReverseDepartureData
      }
    ]

    const result = yield call(changeBookingsAPI, dataToSend)

    if (result.status === 200) {
      if (typeof handleCloseModal === 'function') {
        handleCloseModal()
      }
      yield put(getBookings(false))
      yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_BOOKINGS))
    }
  } catch (error) {
    const { response } = error
    console.error(BookingsActionTypes.CHANGE_BOOKINGS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_BOOKINGS))
  }
}

export default function* root() {
  yield all([
    takeLatest(BookingsActionTypes.GET_BOOKINGS, getBookingsSaga),
    takeLatest(BookingsActionTypes.GET_TICKET, getTicketSaga),
    takeLatest(BookingsActionTypes.CHANGE_BOOKINGS, changeBookingsSaga)
  ])
}
