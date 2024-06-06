import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const tripSearchAPI = (data, token) => {
  const url = token ? URL.TRIP_SEARCH : URL.TRIP_SEARCH_NOT_AUTH
  return ApiClient.post(url, data)
}

export const tripSearchForReverseAPI = data => {
  return ApiClient.post(URL.TRIP_SEARCH_FOR_REVERSE, data)
}

export const createReservationAPI = (data, token) => {
  const url = token ? URL.CREATE_RESERVATION : URL.CREATE_RESERVATION_NOT_AUTH
  return ApiClient.post(url, data)
}
