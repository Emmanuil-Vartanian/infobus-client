import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

import { SnackbarProviderStyled } from './style'

const SnackbarProvider = ({ children }) => {
  return (
    <SnackbarProviderStyled
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      iconVariant={{
        success: <CheckCircleIcon />,
        error: <ErrorIcon />
      }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProviderStyled>
  )
}

export default SnackbarProvider
