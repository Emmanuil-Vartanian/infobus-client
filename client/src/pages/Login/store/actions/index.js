import { createAction } from 'typesafe-actions'
import { AuthActionTypes } from '../types'

const signIn = createAction(AuthActionTypes.SIGN_IN, (data, errorMessage) => ({
  data,
  errorMessage
}))()

const logOutUser = createAction(AuthActionTypes.LOG_OUT)()

const checkAuth = createAction(AuthActionTypes.CHECK_AUTH)()

const setCurrentUserToStore = createAction(
  AuthActionTypes.SET_CURRENT_USER_TO_STORE,
  currentUser => currentUser
)()

export { signIn, logOutUser, checkAuth, setCurrentUserToStore }
