import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const tripSearchAPI = data => {
  return ApiClient.post(URL.TRIP_SEARCH, data)
}

export const tripSearchForReverseAPI = data => {
  return ApiClient.post(URL.TRIP_SEARCH_FOR_REVERSE, data)
}

export const createReservationAPI = data => {
  return ApiClient.post(URL.CREATE_RESERVATION, data)
}
