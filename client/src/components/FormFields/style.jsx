import { styled } from '@mui/system'
import FormControl from '@mui/material/FormControl'
import { styledCustomProps } from 'services/styledCustomProps'

export const FormControlStyled = styled(FormControl)`
  width: 100%;
`

export const ErrorMessage = styled('div')`
  color: red;
  margin: 0px 0px 4px 4px;
  font-size: 12px;
`

export const ColumnsGrid = styled(
  'div',
  styledCustomProps
)(
  ({ columns }) => `
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: 16px;
  align-items: flex-start;
`
)
