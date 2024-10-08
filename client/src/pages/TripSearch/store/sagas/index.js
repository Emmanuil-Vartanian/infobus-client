import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { DirectionsActionTypes } from '../types'
import {
  createReservationAPI,
  getDirectionsAPI,
  tripSearchAPI,
  tripSearchForReverseAPI
} from '../api'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setDirectionsToStore, setTripsToStore } from '../actions'
import { v4 } from 'node-uuid'
import moment from 'moment'
import { SNACKBAR_TYPES } from 'constants/snackbarTypes'
import i18n from 'i18n/config'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'
import { SEND_DATE_FORMAT } from 'constants/dateFormat'

export function* getDirectionsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_DIRECTIONS))

    const result = yield call(getDirectionsAPI)

    if (result.status === 200) {
      yield put(setDirectionsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_DIRECTIONS))
    }
  } catch (error) {
    const { response } = error
    console.error(DirectionsActionTypes.GET_DIRECTIONS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_DIRECTIONS))
  }
}

export function* tripSearchSaga(action) {
  const data = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.TRIP_SEARCH))

    const token = yield select(getCurrentUserTokenSelector)

    const dataForSend = {
      arrival: { city: data.arrival.value },
      departure: { city: data.departure.value }
    }

    const result = yield call(tripSearchAPI, dataForSend, token)

    if (result.status === 200) {
      yield put(setTripsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.TRIP_SEARCH))
    }
  } catch (error) {
    const { response } = error
    console.error(DirectionsActionTypes.TRIP_SEARCH, response)
    yield put(clearEffectLoading(EFFECT_LOADING.TRIP_SEARCH))
  }
}

export function* tripSearchForReverseSaga(action) {
  const { data, setReservation } = action.payload

  try {
    const dataForSend = {
      departure: { city: data.arrival.city },
      arrival: { city: data.departure.city },
      trip_id: data.reverse_trip_id
    }

    const result = yield call(tripSearchForReverseAPI, dataForSend)

    if (result.status === 200) {
      setReservation(prev => ({ ...prev, reverseData: result.data }))
    }
  } catch (error) {
    const { response } = error
    console.error(DirectionsActionTypes.TRIP_SEARCH_FOR_REVERSE, response)
  }
}

export function* createReservationSaga(action) {
  const { data, ticket, enqueueSnackbar, closeModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.CREATE_RESERVATION))

    const token = yield select(getCurrentUserTokenSelector)

    const passengersList = []

    const numPassengers = Object.keys(data).filter(key =>
      key.startsWith('passengerFirstName')
    ).length

    for (let i = 1; i <= numPassengers; i++) {
      passengersList.push({
        first_name: data[`passengerFirstName${i}`],
        last_name: data[`passengerLastName${i}`],
        birth_date: moment(data[`passengerBirthDate${i}`]).format(SEND_DATE_FORMAT),
        passport_id: data[`passengerPassportNumber${i}`],
        discount: data[`passengerDiscounts${i}`],
        salutation: data[`passengerGreeting${i}`],
        passenger_id: v4(),
        passenger_order: 0,
        ow_seat_number: data.disabledSeats ? data.disabledSeats[i - 1] : null,
        rt_seat_number: null
      })
    }

    const reverseDataForSend = ticket.reverseData
      ? {
          reverse_direction_id: ticket.reverseData._id,
          reverse_direction_number_id: ticket.reverseData.direction_number_id
        }
      : {}

    const userData = !token
      ? {
          user_data: {
            salutation: data.greeting,
            user_last_name: data.lastName,
            user_first_name: data.firstName,
            street: data.street,
            postal_code: data.postalCode,
            city: data.city,
            contact_tel: data.phoneNumber,
            contact_tel_mobile: data.mobilePhoneNumber,
            contact_email: data.email
          }
        }
      : {}

    const dataForSend = {
      type: ticket.price === ticket.prices.ow_price ? 'ow' : 'rt',
      price: String(ticket.price),
      passengers_list: passengersList,
      passengers_contact_tel: data.mobilePhoneNumber,
      payment_place: data.payment_place,
      departure: {
        ...ticket.departure,
        date: data.date
      },
      arrival: {
        ...ticket.arrival,
        date: moment(data.date).add(1, 'days').format(SEND_DATE_FORMAT)
      },
      departure_reverse: data?.returnDate
        ? { ...ticket.reverseData.arrival, point_order: 0, date: data.returnDate }
        : null,
      arrival_reverse: data?.returnDate
        ? {
            ...ticket.reverseData.departure,
            point_order: 1,
            date: moment(data.returnDate).add(1, 'days').format(SEND_DATE_FORMAT)
          }
        : null,
      main_trip_direction: ticket.main_trip_direction,
      consolidator_id: ticket.consolidator_id,
      consolidator_name: ticket.consolidator_name,
      carrier_id: ticket.carrier_id,
      carrier_name: ticket.carrier_name,
      direction_id: ticket._id,
      direction_number_id: ticket.direction_number_id,
      trip_id: ticket.trip_id,
      reverse_trip_id: ticket.reverse_trip_id,
      ...reverseDataForSend,
      ...userData
    }

    const result = yield call(createReservationAPI, dataForSend, token)

    if (result.status === 200 || result.status === 201) {
      if (typeof enqueueSnackbar === 'function') {
        enqueueSnackbar(i18n.t('pages.tripSearch.reservationAdded'), {
          variant: SNACKBAR_TYPES.SUCCESS
        })
      }
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_RESERVATION))
    }
  } catch (error) {
    const { response } = error
    console.error(DirectionsActionTypes.CREATE_RESERVATION, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_RESERVATION))
  }
}

export default function* root() {
  yield all([
    takeLatest(DirectionsActionTypes.GET_DIRECTIONS, getDirectionsSaga),
    takeLatest(DirectionsActionTypes.TRIP_SEARCH, tripSearchSaga),
    takeLatest(DirectionsActionTypes.TRIP_SEARCH_FOR_REVERSE, tripSearchForReverseSaga),
    takeLatest(DirectionsActionTypes.CREATE_RESERVATION, createReservationSaga)
  ])
}
