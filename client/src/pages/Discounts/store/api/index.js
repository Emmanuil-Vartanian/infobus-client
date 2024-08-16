import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getDiscountsAPI = () => {
  return ApiClient.get(URL.GET_DISCOUNTS)
}

export const createDiscountAPI = data => {
  return ApiClient.post(URL.CREATE_DISCOUNT, data)
}

export const changeDiscountAPI = data => {
  return ApiClient.post(URL.CHANGE_DISCOUNT.replace(':id', data._id), data)
}

export const deleteDiscountAPI = data => {
  return ApiClient.post(URL.DELETE_DISCOUNT.replace(':id', data._id), data)
}
