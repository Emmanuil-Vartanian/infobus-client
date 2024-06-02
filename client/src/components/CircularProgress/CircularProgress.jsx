import React from 'react'
import { CircularProgress as Circular } from '@mui/material/'

import { CircularContainer } from './style'

const CircularProgress = ({ size = 110 }) => {
  return (
    <CircularContainer>
      <Circular size={size} />
    </CircularContainer>
  )
}

export default CircularProgress
