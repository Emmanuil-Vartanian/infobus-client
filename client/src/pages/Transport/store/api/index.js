import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getTransportAPI = () => {
  return ApiClient.get(URL.GET_TRANSPORT)
}
