import { createSelector } from 'reselect'

const getDiscounts = state => state.entities.discounts.data

export const getDiscountsSelector = createSelector([getDiscounts], value => value)
