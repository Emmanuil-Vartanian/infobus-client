import { createReducer } from 'typesafe-actions'
import { setTripsToStore } from '../actions'

const initialState = {
  data: []
}

const tripsReducer = createReducer(initialState).handleAction(
  setTripsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default tripsReducer
