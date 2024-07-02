import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getAgenciesAPI = () => {
  return ApiClient.get(URL.GET_AGENCIES)
}

export const createAgencyAPI = data => {
  return ApiClient.post(URL.CREATE_AGENCY, data)
}

export const changeAgencyAPI = (id, data) => {
  return ApiClient.post(URL.CHANGE_AGENCY.replace(':id', id), data)
}

export const deleteAgencyAPI = data => {
  return ApiClient.delete(URL.CREATE_AGENCY, data)
}
