import { logOutUser } from 'pages/Login/store/actions'
import React from 'react'
import { useDispatch } from 'react-redux'

const Bookings = () => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOutUser())
  }

  return (
    <div>
      Bookings
      <div onClick={handleLogOut}>log out</div>
    </div>
  )
}

export default Bookings
