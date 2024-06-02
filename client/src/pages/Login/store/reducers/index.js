import { createReducer } from 'typesafe-actions'
import { logOutUser, setCurrentUserToStore } from '../actions'

const initialState = {
  currentUser: {
    token: ''
  }
}

const authReducer = createReducer(initialState)
  .handleAction(logOutUser, () => {
    return {
      ...initialState
    }
  })
  .handleAction(setCurrentUserToStore, (state, { payload }) => {
    return {
      ...state,
      currentUser: payload
    }
  })

export default authReducer
