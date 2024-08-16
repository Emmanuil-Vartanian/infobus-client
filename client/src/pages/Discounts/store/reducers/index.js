import { createReducer } from 'typesafe-actions'
import { setDiscountsToStore } from '../actions'

const initialState = {
  data: []
}

const discountsReducer = createReducer(initialState).handleAction(
  setDiscountsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default discountsReducer
