import { createAction } from 'typesafe-actions'
import { LocationsActionTypes } from '../types'

const getLocations = createAction(LocationsActionTypes.GET_LOCATIONS)()

const getCities = createAction(LocationsActionTypes.GET_CITIES)()

const getCountries = createAction(LocationsActionTypes.GET_COUNTRIES)()

const getCitiesByCountry = createAction(LocationsActionTypes.GET_CITIES_BY_COUNTRY)()

const createLocation = createAction(LocationsActionTypes.CREATE_LOCATION, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteLocation = createAction(LocationsActionTypes.DELETE_LOCATION, (data, closeModal) => ({
  data,
  closeModal
}))()

/* REDUCER ACTIONS */

const setLocationsToStore = createAction(
  LocationsActionTypes.SET_LOCATIONS_TO_STORE,
  data => data
)()

const setCitiesToStore = createAction(LocationsActionTypes.SET_CITIES_TO_STORE, cities => cities)()

const setCountriesToStore = createAction(
  LocationsActionTypes.SET_COUNTRIES_TO_STORE,
  countries => countries
)()

export {
  getLocations,
  setLocationsToStore,
  getCities,
  setCitiesToStore,
  getCountries,
  setCountriesToStore,
  getCitiesByCountry,
  createLocation,
  deleteLocation
}
