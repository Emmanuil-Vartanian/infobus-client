import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getTripsAPI = () => {
  return ApiClient.get(URL.GET_TRIPS)
}
