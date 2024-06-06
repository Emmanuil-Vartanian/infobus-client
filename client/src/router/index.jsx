import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from 'constants/routes'

import PrivateRoute from 'components/PrivateRoute'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'
import NotFoundPage from 'pages/NotFound'
import Login from 'pages/Login'
import TripSearch from 'pages/TripSearch'
import Bookings from 'pages/Bookings'
import Ticket from 'pages/Bookings/components/Ticket'

const Router = () => {
  const token = useSelector(getCurrentUserTokenSelector)

  const tripSearchForNotAuth = !token
    ? [{ path: ROUTES.TRIP_SEARCH_PAGE, element: <TripSearch /> }]
    : []

  const router = useRoutes([
    { path: '*', element: <NotFoundPage /> },
    ...tripSearchForNotAuth,
    {
      path: ROUTES.LOGIN_PAGE,
      element: !token ? <Login /> : <Navigate to={ROUTES.BOOKINGS_PAGE} />
    },
    { path: ROUTES.BOOKING_TICKET, element: <Ticket /> },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        { path: ROUTES.BOOKINGS_PAGE, element: <Bookings /> },
        { path: ROUTES.TRIP_SEARCH_PAGE, element: <TripSearch /> }
      ]
    }
  ])

  return router
}

export default Router
