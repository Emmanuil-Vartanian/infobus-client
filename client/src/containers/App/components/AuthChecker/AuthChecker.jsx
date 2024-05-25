import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { checkAuth } from 'pages/Login/store/actions'

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return <>{children}</>
}

export default AuthChecker
