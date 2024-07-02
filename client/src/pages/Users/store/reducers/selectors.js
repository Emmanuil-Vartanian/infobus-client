import { createSelector } from 'reselect'

const getUsers = state => state.entities.users.users.data
const getConsolidators = state => state.entities.users.consolidators.data

export const getUsersSelector = createSelector([getUsers], value => value)

export const getConsolidatorsSelector = createSelector([getConsolidators], value => value)
