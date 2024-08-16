import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getLocationsAPI = () => {
  return ApiClient.get(URL.GET_LOCATIONS)
}

export const getCitiesAPI = () => {
  return ApiClient.get(URL.GET_CITIES)
}

export const getCountriesAPI = () => {
  return ApiClient.get(URL.GET_COUNTRIES)
}

export const getCitiesByCountryAPI = data => {
  return ApiClient.post(URL.GET_CITIES_BY_COUNTRY, data)
}

export const createLocationAPI = data => {
  return ApiClient.post(URL.CREATE_LOCATION, data)
}

export const changeLocationAPI = (id, data) => {
  return ApiClient.post(URL.CHANGE_LOCATION.replace(':id', id), data)
}

export const deleteLocationAPI = data => {
  return ApiClient.post(URL.DELETE_LOCATION.replace(':id', data._id), data)
}
