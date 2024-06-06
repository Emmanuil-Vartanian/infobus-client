import { createReducer } from 'typesafe-actions'
import { setBookingsToStore, setTicketToStore } from '../actions'
import { combineReducers } from 'redux'

const bookingsInitialState = {
  data: []
}

const ticketInitialState = {
  data: null
}

const bookingsReducer = createReducer(bookingsInitialState).handleAction(
  setBookingsToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  }
)

const ticketReducer = createReducer(ticketInitialState).handleAction(
  setTicketToStore,
  (state, { payload }) => {
    return {
      ...state,
      data: { ...payload }
    }
  }
)

const bookingsCombineReducers = combineReducers({
  bookings: bookingsReducer,
  ticket: ticketReducer
})

export default bookingsCombineReducers
