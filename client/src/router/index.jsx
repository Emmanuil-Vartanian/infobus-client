import React from 'react'
import { useRoutes } from 'react-router-dom'

import { ROUTES } from 'constants/routes'

// import Login from 'pages/Login'
import NotFoundPage from 'pages/NotFound'
import Login from 'pages/Login'

const Router = () => {
  const router = useRoutes([
    { path: '*', element: <NotFoundPage /> },
    { path: ROUTES.LOGIN_PAGE, element: <Login /> }
  ])

  return router
}

export default Router
