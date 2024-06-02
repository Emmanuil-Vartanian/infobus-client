const apiBase = 'http://127.0.0.1:3333/api'

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
const TRIP_SEARCH = `${DIRECTIONS_SERVICE}/search/welcome`
const TRIP_SEARCH_FOR_REVERSE = `${DIRECTIONS_SERVICE}/search/trip/welcome`

/* BOOKINGS SERVICE */
const CREATE_RESERVATION = `${BOOKINGS_SERVICE}/new/welcome`

export const URL = {
  LOGIN,
  VALIDATE_TOKEN,
  GET_CITIES,
  TRIP_SEARCH,
  CREATE_RESERVATION,
  TRIP_SEARCH_FOR_REVERSE
}
