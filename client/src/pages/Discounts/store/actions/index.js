import { createAction } from 'typesafe-actions'
import { DiscountsActionTypes } from '../types'

const getDiscounts = createAction(DiscountsActionTypes.GET_DISCOUNTS)()

const createDiscount = createAction(DiscountsActionTypes.CREATE_DISCOUNT, (data, closeModal) => ({
  data,
  closeModal
}))()

const changeDiscount = createAction(DiscountsActionTypes.CHANGE_DISCOUNT, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteDiscount = createAction(DiscountsActionTypes.DELETE_DISCOUNT, (data, closeModal) => ({
  data,
  closeModal
}))()

/* REDUCER ACTIONS */

const setDiscountsToStore = createAction(
  DiscountsActionTypes.SET_DISCOUNTS_TO_STORE,
  data => data
)()

export { getDiscounts, setDiscountsToStore, createDiscount, deleteDiscount, changeDiscount }
