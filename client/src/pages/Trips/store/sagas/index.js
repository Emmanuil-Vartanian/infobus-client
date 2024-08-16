import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { TripsActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getTrips, setTripsToStore } from '../actions'
import { createTripAPI, deleteTripAPI, getTripsAPI, updateTripAPI } from '../api'
import { getRoutesSelector } from 'pages/Routes/store/reducers/selectors'
import { getBaggageSelector } from 'pages/Baggage/store/reducers/selectors'
import { getTransportSelector } from 'pages/Transport/store/reducers/selectors'
import moment from 'moment'
import { getDiscountsSelector } from 'pages/Discounts/store/reducers/selectors'
import { changeDirectionsAPI } from 'pages/TripSearch/store/api'
import { getTripsSelector } from '../reducers/selectors'
import { SEND_DATE_FORMAT } from 'constants/dateFormat'
import {
  transformCreateTripData,
  transformUpdateRouteTripData,
  transformUpdateScheduleTripData
} from 'pages/Trips/transformDataForSend'
import { getLocationsSelector } from 'pages/Locations/store/reducers/selectors'

export function* getTripsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_TRIPS))

    const result = yield call(getTripsAPI)

    if (result.status === 200) {
      yield put(setTripsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_TRIPS))
    }
  } catch (error) {
    const { response } = error
    console.error(TripsActionTypes.GET_TRIPS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_TRIPS))
  }
}

export function* createTripSaga(action) {
  const { data, onClose } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.CREATE_TRIP))

    const routes = yield select(getRoutesSelector)
    const baggage = yield select(getBaggageSelector)
    const transport = yield select(getTransportSelector)
    const discounts = yield select(getDiscountsSelector)

    const route = routes.find(route => route._id === data.route.value)
    const newBaggages = baggage?.filter(baggage => data?.baggage?.includes(baggage?._id))
    const carrierAndTransport = transport.find(
      transport => transport._id === data.carrierAndTransport
    )
    const newDiscounts = discounts?.filter(discount => data?.discounts?.includes(discount?._id))

    const transformedData = transformCreateTripData({
      ...data,
      route,
      carrierAndTransport,
      baggage: newBaggages,
      discounts: newDiscounts
    })

    const result = yield call(createTripAPI, transformedData)

    if (result.status === 201) {
      yield put(getTrips())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_TRIP))
      if (typeof onClose === 'function') {
        onClose()
      }
    }
  } catch (error) {
    const { response } = error
    console.error(TripsActionTypes.CREATE_TRIP, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_TRIP))
  }
}

export function* updateTripSaga(action) {
  const { data, onClose } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.UPDATE_TRIP))

    const discounts = yield select(getDiscountsSelector)
    const baggage = yield select(getBaggageSelector)
    const trips = yield select(getTripsSelector)

    const reverseTrip = trips.find(trip => trip._id === data.reverse_trip_id)

    let reverseResult

    let tabData

    let transformedData = {
      updated: [data.tab],
      [data.tab]: tabData
    }

    if (data.tab === 'route') {
      const locations = yield select(getLocationsSelector)

      transformedData = {
        ...transformUpdateRouteTripData(data.points, data, locations),
        updated: ['route', 'points', 'departure', 'arrival']
      }

      if (data.applyChanges) {
        const reverseTripData = {
          ...transformUpdateRouteTripData(reverseTrip.points, data, locations, true),
          updated: ['route', 'points', 'departure', 'arrival']
        }
        reverseResult = yield call(updateTripAPI, data.reverse_trip_id, reverseTripData)
      }
    } else if (data.tab === 'schedule') {
      transformedData = {
        ...transformUpdateScheduleTripData(data),
        updated: ['schedule', 'points', 'directions', 'departure', 'arrival']
      }
    } else if (data.tab === 'seats') {
      const start = moment(data?.seats_start_date)
      const end = moment(data?.seats_end_date)
      const dates = []

      if (data.seats_start_date) {
        if (data.seats_end_date) {
          while (start <= end) {
            dates.push(start.format(SEND_DATE_FORMAT))
            start.add(1, 'days')
          }
        } else {
          dates.push(start.format(SEND_DATE_FORMAT))
        }
      }

      transformedData = {
        updated: ['seats', 'seats_selection'],
        seats_selection: data.seats_selection,
        seats: data?.seats?.map(seat => {
          if (data?.disabledSeats?.includes(seat.seat)) {
            return {
              ...seat,
              blocked_dates: [...new Set([...seat.blocked_dates, ...dates])]
            }
          }
          return {
            ...seat,
            blocked_dates: seat.blocked_dates.filter(date => !dates.includes(date))
          }
        })
      }
    } else if (data.tab === 'prices') {
      const list = directions => {
        return directions.map((item, index) => {
          return {
            dfb_order: index + 1,
            departure: {
              country: item.departure.country,
              city: item.departure.city
            },
            arrival: {
              country: item.arrival.country,
              city: item.arrival.city
            },
            ow_price: data[`ow_price_${index}`],
            rt_price: data[`rt_price_${index}`],
            season_ow_price: data[`season_ow_price_${index}`],
            season_rt_price: data[`season_rt_price_${index}`]
          }
        })
      }

      transformedData = {
        prices: {
          list: list(data.directions),
          start_season_date: data.start_season_date || '',
          end_season_date: data.end_season_date || '',
          ow_price: data[`ow_price_0`],
          rt_price: data[`rt_price_0`],
          season_ow_price: data[`season_ow_price_0`],
          season_rt_price: data[`season_rt_price_0`]
        }
      }
      if (data.applyChanges) {
        const reverseTripData = {
          prices: {
            ...transformedData.prices,
            list: list(reverseTrip.directions)
          }
        }
        reverseResult = yield call(updateTripAPI, data.reverse_trip_id, reverseTripData)
      }
    } else if (data.tab === 'discounts') {
      transformedData[data.tab] = discounts.filter(discount =>
        data.discounts.includes(discount._id)
      )
    } else if (data.tab === 'baggage') {
      transformedData[data.tab] = baggage.filter(baggage => data.baggage.includes(baggage._id))
    } else if (data.tab === 'invoiceAndTicketText') {
      transformedData = {
        updated: ['invoiceText', 'ticketText'],
        invoice_text: data?.invoice_text || '',
        ticket_text: data?.ticket_text || ''
      }
    } else if (data.tab === 'activate') {
      transformedData = {
        updated: ['route', 'points', 'departure', 'arrival', 'active'],
        active: data.active,
        departure: { ...data.departure, active: data[data.departure.point_id] },
        arrival: { ...data.arrival, active: data[data.arrival.point_id] },
        points: data.points.map(point => ({ ...point, active: data[point.point_id] }))
      }

      if (data.applyChanges) {
        const reverseTripData = {
          ...transformedData,
          departure: { ...reverseTrip.departure, active: data[reverseTrip.departure.point_id] },
          arrival: { ...reverseTrip.arrival, active: data[reverseTrip.arrival.point_id] },
          points: reverseTrip.points.map(point => ({ ...point, active: data[point.point_id] }))
        }
        reverseResult = yield call(updateTripAPI, data.reverse_trip_id, reverseTripData)
      }
    }

    const result = yield call(updateTripAPI, data._id, transformedData)

    if (
      data.applyChanges &&
      data.tab !== 'activate' &&
      data.tab !== 'prices' &&
      data.tab !== 'route'
    ) {
      reverseResult = yield call(updateTripAPI, data.reverse_trip_id, transformedData)
    }

    if (data.tab === 'activate') {
      const directionsData = data.directions.map(direction => ({
        active: data[direction.departure.point_id] && data[direction.arrival.point_id],
        direction_id: direction.direction_id
      }))
      yield call(changeDirectionsAPI, directionsData)

      if (data.applyChanges) {
        const directionsData = reverseTrip.directions.map(direction => ({
          active: data[direction.departure.point_id] && data[direction.arrival.point_id],
          direction_id: direction.direction_id
        }))
        yield call(changeDirectionsAPI, directionsData)
      }
    }

    if (
      (reverseResult && result.status === 200 && reverseResult.status === 200) ||
      result.status === 200
    ) {
      yield put(getTrips())
      yield put(clearEffectLoading(EFFECT_LOADING.UPDATE_TRIP))
      if (typeof onClose === 'function') {
        onClose()
      }
    }
  } catch (error) {
    const { response } = error
    console.error(TripsActionTypes.UPDATE_TRIP, response)
    yield put(clearEffectLoading(EFFECT_LOADING.UPDATE_TRIP))
  }
}

export function* deleteTripSaga(action) {
  const { id, onClose } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const result = yield call(deleteTripAPI, id)

    if (result.status === 200) {
      yield put(getTrips())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
      if (typeof onClose === 'function') {
        onClose()
      }
    }
  } catch (error) {
    const { response } = error
    console.error(TripsActionTypes.DELETE_TRIP, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(TripsActionTypes.GET_TRIPS, getTripsSaga),
    takeLatest(TripsActionTypes.CREATE_TRIP, createTripSaga),
    takeLatest(TripsActionTypes.UPDATE_TRIP, updateTripSaga),
    takeLatest(TripsActionTypes.DELETE_TRIP, deleteTripSaga)
  ])
}
