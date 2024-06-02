import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkAuth } from 'pages/Login/store/actions'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch()
  const token = useSelector(getCurrentUserTokenSelector)

  useEffect(() => {
    if (token) {
      dispatch(checkAuth())
    }
  }, [token])

  return <>{children}</>
}

export default AuthChecker
