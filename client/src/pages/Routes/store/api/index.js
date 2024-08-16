import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getRoutesAPI = () => {
  return ApiClient.get(URL.GET_ROUTES)
}

export const createRouteAPI = data => {
  return ApiClient.post(URL.CREATE_ROUTE, data)
}

export const deleteRouteAPI = (id, data) => {
  return ApiClient.post(URL.DELETE_ROUTE.replace(':id', id), data)
}
