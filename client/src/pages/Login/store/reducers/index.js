import { createReducer } from 'typesafe-actions'
import { logOutUser, setCurrentUser } from '../actions'

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
  .handleAction(setCurrentUser, (state, { payload }) => {
    return {
      ...state,
      currentUser: { ...payload }
    }
  })

export default authReducer
