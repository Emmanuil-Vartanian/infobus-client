import React from 'react'
import { ThemeProvider as Provider } from '@mui/material/styles'

import theme from 'styles/theme'

const ThemeProvider = ({ children }) => {
  return <Provider theme={theme}>{children}</Provider>
}

export default ThemeProvider
