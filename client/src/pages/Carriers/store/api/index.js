import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getCarriersAPI = () => {
  return ApiClient.get(URL.GET_CARRIERS)
}
