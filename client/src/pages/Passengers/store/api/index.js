import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getPassengersAPI = () => {
  return ApiClient.get(URL.GET_PASSENGERS)
}
