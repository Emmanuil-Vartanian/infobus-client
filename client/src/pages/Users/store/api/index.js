import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getUsersAPI = () => {
  return ApiClient.get(URL.GET_USERS)
}

export const getConsolidatorsAPI = data => {
  return ApiClient.get(URL.GET_CONSOLIDATORS, data)
}
