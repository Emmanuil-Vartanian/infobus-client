import { createSelector } from 'reselect'

const getCurrentUser = state => state.auth.currentUser
const getCurrentUserToken = state => state.auth.currentUser.token
const getCurrentUserRole = state => state.auth.currentUser.role

export const getCurrentUserSelector = createSelector([getCurrentUser], value => value)

export const getCurrentUserTokenSelector = createSelector([getCurrentUserToken], value => value)

export const getCurrentUserRoleSelector = createSelector([getCurrentUserRole], value => value)
