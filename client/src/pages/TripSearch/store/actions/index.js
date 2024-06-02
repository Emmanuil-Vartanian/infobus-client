import { createAction } from 'typesafe-actions'
import { DirectionsActionTypes } from '../types'

const tripSearch = createAction(DirectionsActionTypes.TRIP_SEARCH, data => data)()

const tripSearchForReverse = createAction(
  DirectionsActionTypes.TRIP_SEARCH_FOR_REVERSE,
  (data, setReservation) => ({ data, setReservation })
)()

const createReservation = createAction(DirectionsActionTypes.CREATE_RESERVATION, data => data)()

const setTripsToStore = createAction(DirectionsActionTypes.SET_TRIPS_TO_STORE, trips => trips)()

export { tripSearch, tripSearchForReverse, setTripsToStore, createReservation }
