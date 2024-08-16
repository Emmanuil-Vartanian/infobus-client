import { createReducer } from 'typesafe-actions'
import { setRoutesToStore } from '../actions'

const initialState = {
  data: []
}

const routesReducer = createReducer(initialState).handleAction(
  setRoutesToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

export default routesReducer
