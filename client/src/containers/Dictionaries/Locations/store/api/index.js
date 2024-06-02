import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getCitiesAPI = () => {
  return ApiClient.get(URL.GET_CITIES)
}
