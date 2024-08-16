import { createAction } from 'typesafe-actions'
import { TripsActionTypes } from '../types'

const getTrips = createAction(TripsActionTypes.GET_TRIPS)()

const createTrip = createAction(TripsActionTypes.CREATE_TRIP, (data, onClose) => ({
  data,
  onClose
}))()

const updateTrip = createAction(TripsActionTypes.UPDATE_TRIP, (data, onClose) => ({
  data,
  onClose
}))()

const deleteTrip = createAction(TripsActionTypes.DELETE_TRIP, (id, onClose) => ({
  id,
  onClose
}))()

const setTripsToStore = createAction(TripsActionTypes.SET_TRIPS_TO_STORE, data => data)()

export { getTrips, setTripsToStore, createTrip, updateTrip, deleteTrip }
