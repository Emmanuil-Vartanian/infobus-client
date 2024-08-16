import { createReducer } from 'typesafe-actions'
import { setConsolidatorsToStore, setUsersToStore } from '../actions'
import { combineReducers } from 'redux'

const usersInitialState = {
  data: []
}

const consolidatorsInitialState = {
  data: []
}

const usersReducer = createReducer(usersInitialState).handleAction(
  setUsersToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const consolidatorsReducer = createReducer(consolidatorsInitialState).handleAction(
  setConsolidatorsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const usersCombineReducers = combineReducers({
  users: usersReducer,
  consolidators: consolidatorsReducer
})

export default usersCombineReducers
