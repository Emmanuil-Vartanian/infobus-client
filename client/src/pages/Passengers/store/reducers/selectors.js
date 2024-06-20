import { createSelector } from 'reselect'

const getPassengers = state => state.entities.passengers.data

export const getPassengersSelector = createSelector([getPassengers], value => value)
