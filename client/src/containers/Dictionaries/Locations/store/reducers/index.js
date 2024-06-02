import { createReducer } from 'typesafe-actions'
import { setLocationsToStore } from '../actions'

const initialState = {
  data: []
}

const locationsReducer = createReducer(initialState).handleAction(
  setLocationsToStore,
  (state, { payload }) => {
    return {
      data: [...payload]
    }
  }
)

export default locationsReducer
