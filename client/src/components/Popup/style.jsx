import { styled } from '@mui/system'
import DialogContentText from '@mui/material/DialogContentText'
import IconButton from '@mui/material/IconButton'
import { Dialog } from '@mui/material'

export const DialogStyled = styled(Dialog)(
  ({ maxwidth }) =>
    maxwidth &&
    `
      .MuiPaper-root {
        max-width: ${maxwidth * 4}px;
        width: 100%;
      }
    `
)

export const DialogContentTextStyled = styled(DialogContentText)`
  white-space: pre-wrap;
  color: #000000de !important;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
`

export const IconButtonStyled = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: grey;
`
