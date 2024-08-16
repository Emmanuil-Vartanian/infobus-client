import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getUsersAPI = () => {
  return ApiClient.get(URL.GET_USERS)
}

export const changeUserAPI = data => {
  return ApiClient.post(URL.GET_USERS, data)
}

export const getConsolidatorsAPI = data => {
  return ApiClient.get(URL.GET_CONSOLIDATORS, data)
}

export const deleteUserAPI = (id, data) => {
  return ApiClient.post(URL.DELETE_USER.replace(':id', id), data)
}
