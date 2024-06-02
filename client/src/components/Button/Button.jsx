import React from 'react'
import { Button as ButtonMui } from '@mui/material'

const Button = ({ size = 'large', ...rest }) => {
  return <ButtonMui variant="contained" size={size} {...rest} />
}

export default Button
