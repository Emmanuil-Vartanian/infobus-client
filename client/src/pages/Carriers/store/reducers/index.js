import { createReducer } from 'typesafe-actions'
import { setCarriersToStore } from '../actions'

const initialState = {
  data: []
}

const carriersReducer = createReducer(initialState).handleAction(
  setCarriersToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default carriersReducer
