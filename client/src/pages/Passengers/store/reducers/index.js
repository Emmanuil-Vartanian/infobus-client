import { createReducer } from 'typesafe-actions'
import { setPassengersToStore } from '../actions'

const initialState = {
  data: []
}

const passengersReducer = createReducer(initialState).handleAction(
  setPassengersToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default passengersReducer
