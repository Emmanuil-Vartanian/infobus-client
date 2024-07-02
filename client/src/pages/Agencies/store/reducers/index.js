import { createReducer } from 'typesafe-actions'
import { setAgenciesToStore } from '../actions'

const initialState = {
  data: []
}

const agenciesReducer = createReducer(initialState).handleAction(
  setAgenciesToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default agenciesReducer
