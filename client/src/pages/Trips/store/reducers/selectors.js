import { createSelector } from 'reselect'

const getTrips = state => state.entities.trips.data

export const getTripsSelector = createSelector([getTrips], value => value)
