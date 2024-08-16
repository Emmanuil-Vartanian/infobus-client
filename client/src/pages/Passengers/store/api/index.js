import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getPassengersAPI = all => {
  const url = all ? URL.GET_ALL_PASSENGERS : URL.GET_PASSENGERS
  return ApiClient.get(url)
}
