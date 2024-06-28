import { createSelector } from 'reselect'

const getLocations = state => state.entities.locations.locations.data
const getCitiesState = state => state.entities.locations.cities.data

export const getLocationsSelector = createSelector([getLocations], value => value)

export const getCitiesSelector = createSelector([getCitiesState], value => value)
