import { createSelector } from 'reselect'

const getBookings = state => state.entities.bookings.bookings.data
const getTicket = state => state.entities.bookings.ticket.data

export const getBookingsSelector = createSelector([getBookings], value => value)

export const ticketSelector = createSelector([getTicket], value => value)
