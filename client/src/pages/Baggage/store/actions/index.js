import { createAction } from 'typesafe-actions'
import { BaggageActionTypes } from '../types'

const getBaggage = createAction(BaggageActionTypes.GET_BAGGAGE)()

const createBaggage = createAction(BaggageActionTypes.CREATE_BAGGAGE, (data, closeModal) => ({
  data,
  closeModal
}))()

const changeBaggage = createAction(BaggageActionTypes.CHANGE_BAGGAGE, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteBaggage = createAction(BaggageActionTypes.DELETE_BAGGAGE, (data, closeModal) => ({
  data,
  closeModal
}))()

/* REDUCER ACTIONS */

const setBaggageToStore = createAction(BaggageActionTypes.SET_BAGGAGE_TO_STORE, data => data)()

export { getBaggage, setBaggageToStore, createBaggage, deleteBaggage, changeBaggage }
