import { createAction } from 'typesafe-actions'
import { CarriersActionTypes } from '../types'

const getCarriers = createAction(CarriersActionTypes.GET_CARRIERS)()

const setCarriersToStore = createAction(CarriersActionTypes.SET_CARRIERS_TO_STORE, data => data)()

export { getCarriers, setCarriersToStore }
