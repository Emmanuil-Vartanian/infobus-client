import { createSelector } from 'reselect'

const getLocations = state => state.entities.locations.locations.data
const getCitiesState = state => state.entities.locations.cities.data
const getCountriesState = state => state.entities.locations.countries.data

export const getLocationsSelector = createSelector([getLocations], value => value)

export const getCitiesSelector = createSelector([getCitiesState], value => value)

export const getCountriesSelector = createSelector([getCountriesState], value => value)
