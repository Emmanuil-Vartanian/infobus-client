import { createReducer } from 'typesafe-actions'
import { setCitiesToStore, setCountriesToStore, setLocationsToStore } from '../actions'
import { combineReducers } from 'redux'

const locationsInitialState = {
  data: []
}

const citiesInitialState = {
  data: []
}

const countriesInitialState = {
  data: []
}

const locationsReducer = createReducer(locationsInitialState).handleAction(
  setLocationsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const citiesReducer = createReducer(citiesInitialState).handleAction(
  setCitiesToStore,
  (state, { payload }) => {
    return {
      data: [...payload]
    }
  }
)

const countriesReducer = createReducer(countriesInitialState).handleAction(
  setCountriesToStore,
  (state, { payload }) => {
    return {
      data: [...payload]
    }
  }
)

const locationsCombineReducers = combineReducers({
  locations: locationsReducer,
  cities: citiesReducer,
  countries: countriesReducer
})

export default locationsCombineReducers
