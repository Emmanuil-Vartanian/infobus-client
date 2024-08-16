import { styled } from '@mui/system'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import { styledCustomProps } from 'services/styledCustomProps'

export const CheckboxStyled = styled(Checkbox)`
  width: auto;
  align-self: start;
  &.MuiButtonBase-root.MuiCheckbox-root.Mui-checked {
    color: #63060a;
  }
  &.Mui-disabled {
    .MuiButtonBase-root.MuiCheckbox-root.Mui-checked {
      opacity: 0.5;
    }
  }
`

export const CheckboxFormControlStyled = styled(
  FormControl,
  styledCustomProps
)(
  ({ flexDirection }) => `
  height: 100%;
  justify-content: center;
  .MuiFormControlLabel-label {
    font-size: 13px;
    flex-direction: column-reverse;
  }
  .MuiFormControlLabel-root {
    flex-direction: ${flexDirection};
  }
  .MuiCheckbox-root {
    padding: 0 4px;
  }
`
)
