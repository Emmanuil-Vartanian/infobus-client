import { createSelector } from 'reselect'

const getTripsSearch = state => state.entities.tripsSearch.data

export const getTripsSearchSelector = createSelector([getTripsSearch], value => value)
