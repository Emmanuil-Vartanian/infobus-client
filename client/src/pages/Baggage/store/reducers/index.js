import { createReducer } from 'typesafe-actions'
import { setBaggageToStore } from '../actions'

const initialState = {
  data: []
}

const baggageReducer = createReducer(initialState).handleAction(
  setBaggageToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default baggageReducer
