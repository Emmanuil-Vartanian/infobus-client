import { createAction } from 'typesafe-actions'
import { BookingsActionTypes } from '../types'

const getBookings = createAction(BookingsActionTypes.GET_BOOKINGS, archived => archived)()

const changeBookings = createAction(
  BookingsActionTypes.CHANGE_BOOKINGS,
  (data, handleCloseModal) => ({ data, handleCloseModal })
)()

const getTicket = createAction(BookingsActionTypes.GET_TICKET)()

const setBookingsToStore = createAction(BookingsActionTypes.SET_BOOKINGS_TO_STORE, data => data)()

const setTicketToStore = createAction(BookingsActionTypes.SET_TICKET_TO_STORE, data => data)()

export { getBookings, setBookingsToStore, getTicket, setTicketToStore, changeBookings }
