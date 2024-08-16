import { createReducer } from 'typesafe-actions'
import { setTransportToStore } from '../actions'

const initialState = {
  data: []
}

const transportReducer = createReducer(initialState).handleAction(
  setTransportToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default transportReducer
