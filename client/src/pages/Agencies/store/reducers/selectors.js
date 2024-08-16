import { createSelector } from 'reselect'

const getAgencies = state => state.entities.agencies.data

export const getAgenciesSelector = createSelector([getAgencies], value => value)
