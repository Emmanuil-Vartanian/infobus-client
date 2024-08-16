import { createSelector } from 'reselect'

const getBaggage = state => state.entities.baggage.data

export const getBaggageSelector = createSelector([getBaggage], value => value)
