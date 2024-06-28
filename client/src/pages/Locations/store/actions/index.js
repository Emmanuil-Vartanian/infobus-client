import { createAction } from 'typesafe-actions'
import { LocationsActionTypes } from '../types'

const getLocations = createAction(LocationsActionTypes.GET_LOCATIONS)()

const getCities = createAction(LocationsActionTypes.GET_CITIES)()

/* REDUCER ACTIONS */

const setLocationsToStore = createAction(
  LocationsActionTypes.SET_LOCATIONS_TO_STORE,
  data => data
)()

const setCitiesToStore = createAction(LocationsActionTypes.SET_CITIES_TO_STORE, cities => cities)()

export { getLocations, setLocationsToStore, getCities, setCitiesToStore }
