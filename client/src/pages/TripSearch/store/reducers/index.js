import { createReducer } from 'typesafe-actions'
import { setDirectionsToStore, setTripsToStore } from '../actions'
import { combineReducers } from 'redux'

const tripsSearchInitialState = {
  data: null
}

const directionsInitialState = {
  data: null
}

const tripsSearchReducer = createReducer(tripsSearchInitialState).handleAction(
  setTripsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const directionsReducer = createReducer(directionsInitialState).handleAction(
  setDirectionsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const directionsCombineReducers = combineReducers({
  directions: directionsReducer,
  tripsSearch: tripsSearchReducer
})

export default directionsCombineReducers
