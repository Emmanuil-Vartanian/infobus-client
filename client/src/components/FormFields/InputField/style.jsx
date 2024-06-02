import { styled } from '@mui/system'
import TextField from '@mui/material/TextField'
import { styledCustomProps } from 'services/styledCustomProps'

export const TextFieldStyled = styled(TextField, styledCustomProps)`
  width: 100%;
  .MuiInputLabel-asterisk {
    display: ${({ removeAsterisk }) => (removeAsterisk ? 'none' : 'contents')};
  }
  input::placeholder {
    color: red;
    opacity: 1;
    font-size: 12px;
  }
  .MuiIconButton-root > svg {
    width: 20px;
    height: 20px;
  }
`

export const FieldWithIcon = styled(
  'div',
  styledCustomProps
)(
  ({ maxWidth }) => `
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${maxWidth}px;
  > svg {
    color: red;
    margin-right: 8px;
  }
`
)

export const TextFieldContainer = styled('div')`
  width: 100%;
`
