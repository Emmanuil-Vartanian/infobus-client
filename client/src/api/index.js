const apiBase = import.meta.env.VITE_SERVER_API

/* SERVICES */
const AUTH_SERVICE = `${apiBase}/auth`
const LOCATIONS_SERVICE = `${apiBase}/locations`
const DIRECTIONS_SERVICE = `${apiBase}/directions`
const BOOKINGS_SERVICE = `${apiBase}/bookings`
const TRIPS_SERVICE = `${apiBase}/trips`
const AGENCIES_SERVICE = `${apiBase}/agencies`
const USERS_SERVICE = `${apiBase}/users`
const CARRIERS_SERVICE = `${apiBase}/carriers`
const ROUTES_SERVICE = `${apiBase}/routes`
const DISCOUNTS_SERVICE = `${apiBase}/discounts`
const BAGGAGE_SERVICE = `${apiBase}/baggage`
const TRANSPORT_SERVICE = `${apiBase}/transports`

/* AUTH SERVICE */
const LOGIN = `${AUTH_SERVICE}/login`
const VALIDATE_TOKEN = `${AUTH_SERVICE}/current`

/* LOCATIONS SERVICE */
const GET_LOCATIONS = `${LOCATIONS_SERVICE}`
const CREATE_LOCATION = `${LOCATIONS_SERVICE}/new`
const GET_CITIES = `${LOCATIONS_SERVICE}/cities`
const GET_COUNTRIES = `${LOCATIONS_SERVICE}/countries`
const GET_CITIES_BY_COUNTRY = `${LOCATIONS_SERVICE}/countries/cities`
const DELETE_LOCATION = `${LOCATIONS_SERVICE}/:id`
const CHANGE_LOCATION = `${LOCATIONS_SERVICE}/:id`

/* DIRECTIONS SERVICE */
const GET_DIRECTIONS = `${DIRECTIONS_SERVICE}`
const CHANGE_DIRECTIONS = `${DIRECTIONS_SERVICE}`
const TRIP_SEARCH = `${DIRECTIONS_SERVICE}/search`
const TRIP_SEARCH_NOT_AUTH = `${DIRECTIONS_SERVICE}/search/welcome`
const TRIP_SEARCH_FOR_REVERSE = `${DIRECTIONS_SERVICE}/search/trip/welcome`

/* BOOKINGS SERVICE */
const GET_BOOKINGS = `${BOOKINGS_SERVICE}`
const GET_BOOKINGS_ARCHIVED = `${BOOKINGS_SERVICE}/archived`
const GET_TICKET = `${BOOKINGS_SERVICE}/:id`
const CREATE_RESERVATION = `${BOOKINGS_SERVICE}/new`
const CREATE_RESERVATION_NOT_AUTH = `${BOOKINGS_SERVICE}/new/welcome`
const GET_PASSENGERS = `${BOOKINGS_SERVICE}/passengers`
const GET_ALL_PASSENGERS = `${BOOKINGS_SERVICE}/passengers/all`

/* TRIPS SERVICE */
const GET_TRIPS = `${TRIPS_SERVICE}`
const CREATE_TRIP = `${TRIPS_SERVICE}/new`
const UPDATE_TRIP = `${TRIPS_SERVICE}/:id`
const DELETE_TRIP = `${TRIPS_SERVICE}/:id`

/* AGENCIES SERVICE */
const GET_AGENCIES = `${AGENCIES_SERVICE}`
const CREATE_AGENCY = `${AGENCIES_SERVICE}/new`
const CHANGE_AGENCY = `${AGENCIES_SERVICE}/:id`
const DELETE_AGENCY = `${AGENCIES_SERVICE}/delete`

/* USERS SERVICE */
const GET_USERS = `${USERS_SERVICE}`
const GET_CONSOLIDATORS = `${USERS_SERVICE}/consolidators`
const DELETE_USER = `${USERS_SERVICE}/:id`

/* CARRIERS SERVICE */
const GET_CARRIERS = `${CARRIERS_SERVICE}`

/* ROUTES SERVICE */
const GET_ROUTES = `${ROUTES_SERVICE}`
const CREATE_ROUTE = `${ROUTES_SERVICE}/new`
const DELETE_ROUTE = `${ROUTES_SERVICE}/:id`

/* DISCOUNTS SERVICE */
const GET_DISCOUNTS = `${DISCOUNTS_SERVICE}`
const CREATE_DISCOUNT = `${DISCOUNTS_SERVICE}/new`
const DELETE_DISCOUNT = `${DISCOUNTS_SERVICE}/:id`
const CHANGE_DISCOUNT = `${DISCOUNTS_SERVICE}/:id`

/* BAGGAGE SERVICE */
const GET_BAGGAGE = `${BAGGAGE_SERVICE}`
const CREATE_BAGGAGE = `${BAGGAGE_SERVICE}/new`
const DELETE_BAGGAGE = `${BAGGAGE_SERVICE}/:id`
const CHANGE_BAGGAGE = `${BAGGAGE_SERVICE}/:id`

/* TRANSPORT SERVICE */
const GET_TRANSPORT = `${TRANSPORT_SERVICE}`

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
  GET_TICKET,
  GET_TRIPS,
  GET_PASSENGERS,
  GET_LOCATIONS,
  GET_ALL_PASSENGERS,
  GET_AGENCIES,
  CREATE_AGENCY,
  CHANGE_AGENCY,
  DELETE_AGENCY,
  GET_USERS,
  GET_CONSOLIDATORS,
  GET_CARRIERS,
  DELETE_USER,
  GET_COUNTRIES,
  GET_CITIES_BY_COUNTRY,
  CREATE_LOCATION,
  DELETE_LOCATION,
  CHANGE_LOCATION,
  GET_ROUTES,
  CREATE_ROUTE,
  DELETE_ROUTE,
  GET_DISCOUNTS,
  CREATE_DISCOUNT,
  DELETE_DISCOUNT,
  CHANGE_DISCOUNT,
  GET_BAGGAGE,
  CREATE_BAGGAGE,
  DELETE_BAGGAGE,
  CHANGE_BAGGAGE,
  GET_DIRECTIONS,
  GET_TRANSPORT,
  CREATE_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  CHANGE_DIRECTIONS
}
