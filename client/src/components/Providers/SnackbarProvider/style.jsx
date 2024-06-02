import { styled } from '@mui/system'
import { SnackbarProvider } from 'notistack'

export const SnackbarProviderStyled = styled(SnackbarProvider)`
  &.SnackbarContent-root {
    padding: 12px;
    max-width: 400px;
    width: 100%;
  }
  .SnackbarItem-message {
    padding: 0px;
    line-height: 24px;
    letter-spacing: 0.25px;
    font-size: 14px;
    > .MuiSvgIcon-root {
      margin-right: 12px;
    }
  }
`
