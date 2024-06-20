import { createAction } from 'typesafe-actions'
import { PassengersActionTypes } from '../types'

const getPassengers = createAction(PassengersActionTypes.GET_PASSENGERS)()

const setPassengersToStore = createAction(
  PassengersActionTypes.SET_PASSENGERS_TO_STORE,
  data => data
)()

export { getPassengers, setPassengersToStore }
