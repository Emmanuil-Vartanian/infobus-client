import { ROUTES } from 'constants/routes'
import React from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  const login = () => {
    navigate(ROUTES.LOGIN_PAGE)
  }

  return (
    <div>
      NotFound
      <div onClick={login}>Login</div>
    </div>
  )
}

export default NotFound
