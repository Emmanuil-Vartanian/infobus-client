import { createSelector } from 'reselect'

const getRoutes = state => state.entities.routes.data

export const getRoutesSelector = createSelector([getRoutes], value => value)
