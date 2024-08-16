import { createAction } from 'typesafe-actions'
import { RoutesActionTypes } from '../types'

const getRoutes = createAction(RoutesActionTypes.GET_ROUTES)()

const createRoute = createAction(RoutesActionTypes.CREATE_ROUTE, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteRoute = createAction(RoutesActionTypes.DELETE_ROUTE, (data, closeModal) => ({
  data,
  closeModal
}))()

/* REDUCER ACTIONS */

const setRoutesToStore = createAction(RoutesActionTypes.SET_ROUTES_TO_STORE, data => data)()

export { getRoutes, setRoutesToStore, createRoute, deleteRoute }
