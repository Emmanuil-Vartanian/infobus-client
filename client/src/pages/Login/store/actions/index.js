import { createAction } from 'typesafe-actions'
import { AuthActionTypes } from '../types'

const logOutUser = createAction(AuthActionTypes.LOG_OUT)()

const checkAuth = createAction(AuthActionTypes.CHECK_AUTH)()

const setCurrentUser = createAction(AuthActionTypes.SET_CURRENT_USER, currentUser => currentUser)()

export { logOutUser, checkAuth, setCurrentUser }
