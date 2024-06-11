import { createAction } from 'typesafe-actions'
import { TripsActionTypes } from '../types'

const getTrips = createAction(TripsActionTypes.GET_TRIPS)()

const setTripsToStore = createAction(TripsActionTypes.SET_TRIPS_TO_STORE, data => data)()

export { getTrips, setTripsToStore }
