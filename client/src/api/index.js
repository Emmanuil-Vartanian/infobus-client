export const apiBase = '/api'

/* SERVICES */
export const AUTH_SERVICE = `${apiBase}/auth`

/* AUTH SERVICE */
export const LOGIN = `${AUTH_SERVICE}/login`
export const VALIDATE_TOKEN = `${AUTH_SERVICE}/current`

export const URL = {
  LOGIN,
  VALIDATE_TOKEN
}
