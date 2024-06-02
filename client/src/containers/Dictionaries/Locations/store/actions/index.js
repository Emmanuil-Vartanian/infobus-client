import { createAction } from 'typesafe-actions'
import { LocationActionTypes } from '../types'

const getCities = createAction(LocationActionTypes.GET_CITIES)()

/* REDUCER ACTIONS */
const setLocationsToStore = createAction(
  LocationActionTypes.SET_LOCATIONS_TO_STORE,
  cities => cities
)()

export { getCities, setLocationsToStore }
