import { createTheme } from '@mui/material'
import themeComponents from './themeComponents'
import themePalette from './themePalette'

const theme = createTheme({
  ...themeComponents,
  ...themePalette,
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '1.25px',
      textTransform: 'uppercase'
    }
  }
})

export default theme
