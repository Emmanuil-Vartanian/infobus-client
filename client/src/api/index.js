const apiBase = import.meta.env.VITE_SERVER_API

/* SERVICES */
const AUTH_SERVICE = `${apiBase}/auth`
const LOCATIONS_SERVICE = `${apiBase}/locations`
const DIRECTIONS_SERVICE = `${apiBase}/directions`
const BOOKINGS_SERVICE = `${apiBase}/bookings`

/* AUTH SERVICE */
const LOGIN = `${AUTH_SERVICE}/login`
const VALIDATE_TOKEN = `${AUTH_SERVICE}/current`

/* LOCATIONS SERVICE */
const GET_CITIES = `${LOCATIONS_SERVICE}/cities`

/* DIRECTIONS SERVICE */
const TRIP_SEARCH = `${DIRECTIONS_SERVICE}/search`
const TRIP_SEARCH_NOT_AUTH = `${DIRECTIONS_SERVICE}/search/welcome`
const TRIP_SEARCH_FOR_REVERSE = `${DIRECTIONS_SERVICE}/search/trip/welcome`

/* BOOKINGS SERVICE */
const GET_BOOKINGS = `${BOOKINGS_SERVICE}`
const GET_BOOKINGS_ARCHIVED = `${BOOKINGS_SERVICE}/archived`
const GET_TICKET = `${BOOKINGS_SERVICE}/:id`
const CREATE_RESERVATION = `${BOOKINGS_SERVICE}/new`
const CREATE_RESERVATION_NOT_AUTH = `${BOOKINGS_SERVICE}/new/welcome`

export const URL = {
  LOGIN,
  VALIDATE_TOKEN,
  GET_CITIES,
  TRIP_SEARCH,
  TRIP_SEARCH_NOT_AUTH,
  CREATE_RESERVATION,
  CREATE_RESERVATION_NOT_AUTH,
  TRIP_SEARCH_FOR_REVERSE,
  GET_BOOKINGS,
  GET_BOOKINGS_ARCHIVED,
  GET_TICKET
}
