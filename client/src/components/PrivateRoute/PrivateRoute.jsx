import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'
import { ROUTES } from 'constants/routes'
import Layout from 'components/Layout'

const PrivateRoute = () => {
  const { pathname } = useLocation()
  const token = useSelector(getCurrentUserTokenSelector)

  const notPrivatRoutes = ['/', ROUTES.LOGIN_PAGE]

  if (!token) {
    return <Navigate to={ROUTES.LOGIN_PAGE} replace />
  }

  if (token && notPrivatRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.BOOKINGS_PAGE} />
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default PrivateRoute
