import { createAction } from 'typesafe-actions'
import { UsersActionTypes } from '../types'

const getUsers = createAction(UsersActionTypes.GET_USERS)()

const getConsolidators = createAction(UsersActionTypes.GET_CONSOLIDATORS)()

const setUsersToStore = createAction(UsersActionTypes.SET_USERS_TO_STORE, data => data)()

const setConsolidatorsToStore = createAction(
  UsersActionTypes.SET_CONSOLIDATORS_TO_STORE,
  data => data
)()

export { getUsers, setUsersToStore, getConsolidators, setConsolidatorsToStore }
