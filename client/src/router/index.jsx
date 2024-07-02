import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from 'constants/routes'
import { ROLES } from 'constants/roles'
import PrivateRoute from 'components/PrivateRoute'
import {
  getCurrentUserRoleSelector,
  getCurrentUserTokenSelector
} from 'pages/Login/store/reducers/selectors'
import NotFoundPage from 'pages/NotFound'
import Login from 'pages/Login'
import TripSearch from 'pages/TripSearch'
import Bookings from 'pages/Bookings'
import Ticket from 'pages/Bookings/components/Ticket'
import Trips from 'pages/Trips'
import Passengers from 'pages/Passengers'
import Locations from 'pages/Locations'
import Agencies from 'pages/Agencies'
import Users from 'pages/Users'

const Router = () => {
  const token = useSelector(getCurrentUserTokenSelector)
  const userRole = useSelector(getCurrentUserRoleSelector)

  const chief = userRole === ROLES.CHIEF
  const dispatcherOrChief = userRole === ROLES.DISPATCHER || chief

  const tripSearchForNotAuth = !token
    ? [{ path: ROUTES.TRIP_SEARCH_PAGE, element: <TripSearch /> }]
    : []

  const locations = dispatcherOrChief
    ? [{ path: ROUTES.LOCATIONS_PAGE, element: <Locations /> }]
    : []

  const passengers =
    userRole === ROLES.CARRIER_MANAGER || dispatcherOrChief
      ? [{ path: ROUTES.PASSENGERS_PAGE, element: <Passengers /> }]
      : []

  const trips =
    userRole === ROLES.AGENCY_MANAGER || dispatcherOrChief
      ? [{ path: ROUTES.TRIPS_PAGE, element: <Trips /> }]
      : []

  const agencies = chief
    ? [
        { path: ROUTES.AGENCIES_PAGE, element: <Agencies /> },
        { path: ROUTES.USERS_PAGE, element: <Users /> }
      ]
    : []

  const router = useRoutes([
    { path: '*', element: <NotFoundPage /> },
    ...tripSearchForNotAuth,
    {
      path: ROUTES.LOGIN_PAGE,
      element: !token ? <Login /> : <Navigate to={ROUTES.BOOKINGS_PAGE} />
    },
    { path: ROUTES.BOOKING_TICKET, element: <Ticket /> },
    { path: ROUTES.BOOKING_INVOICE, element: <Ticket /> },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        { path: ROUTES.BOOKINGS_PAGE, element: <Bookings /> },
        { path: ROUTES.TRIP_SEARCH_PAGE, element: <TripSearch /> },
        ...trips,
        ...passengers,
        ...locations,
        ...agencies
      ]
    }
  ])

  return router
}

export default Router
