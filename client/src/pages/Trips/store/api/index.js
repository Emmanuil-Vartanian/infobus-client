import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getTripsAPI = () => {
  return ApiClient.get(URL.GET_TRIPS)
}

export const createTripAPI = data => {
  return ApiClient.post(URL.CREATE_TRIP, data)
}

export const updateTripAPI = (id, data) => {
  return ApiClient.post(URL.UPDATE_TRIP.replace(':id', id), data)
}

export const deleteTripAPI = id => {
  return ApiClient.delete(URL.DELETE_TRIP.replace(':id', id))
}
