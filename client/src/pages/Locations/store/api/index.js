import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getLocationsAPI = () => {
  return ApiClient.get(URL.GET_LOCATIONS)
}

export const getCitiesAPI = () => {
  return ApiClient.get(URL.GET_CITIES)
}
