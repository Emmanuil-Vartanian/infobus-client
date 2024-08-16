import { createSelector } from 'reselect'

const getTripsSearch = state => state.entities.directions.tripsSearch.data
const getDirections = state => state.entities.directions.directions.data

export const getTripsSearchSelector = createSelector([getTripsSearch], value => value)

export const getDirectionsSelector = createSelector([getDirections], value => value)
