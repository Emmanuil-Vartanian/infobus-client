import { createSelector } from 'reselect'

const getCurrentUserToken = state => state.auth.currentUser.token

export const getCurrentUserTokenSelector = createSelector([getCurrentUserToken], value => value)
