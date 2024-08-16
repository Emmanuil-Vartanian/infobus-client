import { createSelector } from 'reselect'

const getCarriers = state => state.entities.carriers.data

export const getCarriersSelector = createSelector([getCarriers], value => value)
