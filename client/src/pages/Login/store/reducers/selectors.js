import { createSelector } from 'reselect'

const getCurrentUser = state => state.auth.currentUser
const getCurrentUserToken = state => state.auth.currentUser.token

export const getCurrentUserSelector = createSelector([getCurrentUser], value => value)

export const getCurrentUserTokenSelector = createSelector([getCurrentUserToken], value => value)
