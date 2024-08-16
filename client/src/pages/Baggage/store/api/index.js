import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getBaggageAPI = () => {
  return ApiClient.get(URL.GET_BAGGAGE)
}

export const createBaggageAPI = data => {
  return ApiClient.post(URL.CREATE_BAGGAGE, data)
}

export const changeBaggageAPI = data => {
  return ApiClient.post(URL.CHANGE_BAGGAGE.replace(':id', data._id), data)
}

export const deleteBaggageAPI = data => {
  return ApiClient.post(URL.DELETE_BAGGAGE.replace(':id', data._id), data)
}
