import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const getBookingsAPI = archived => {
  const url = archived ? URL.GET_BOOKINGS_ARCHIVED : URL.GET_BOOKINGS
  return ApiClient.get(url)
}

export const getTicketAPI = id => {
  return ApiClient.get(URL.GET_TICKET.replace(':id', id))
}
