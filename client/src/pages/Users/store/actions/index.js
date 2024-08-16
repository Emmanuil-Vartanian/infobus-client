import { createAction } from 'typesafe-actions'
import { UsersActionTypes } from '../types'

const getUsers = createAction(UsersActionTypes.GET_USERS)()

const getConsolidators = createAction(UsersActionTypes.GET_CONSOLIDATORS)()

const changeUser = createAction(UsersActionTypes.CHANGE_USER, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteUser = createAction(UsersActionTypes.DELETE_USER, (data, closeModal) => ({
  data,
  closeModal
}))()

const setUsersToStore = createAction(UsersActionTypes.SET_USERS_TO_STORE, data => data)()

const setConsolidatorsToStore = createAction(
  UsersActionTypes.SET_CONSOLIDATORS_TO_STORE,
  data => data
)()

export {
  getUsers,
  setUsersToStore,
  getConsolidators,
  setConsolidatorsToStore,
  changeUser,
  deleteUser
}
