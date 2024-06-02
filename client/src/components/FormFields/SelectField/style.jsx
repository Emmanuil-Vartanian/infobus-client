import { styled } from '@mui/system'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { styledCustomProps } from 'services/styledCustomProps'

export const InputLabelStyled = styled(
  InputLabel,
  styledCustomProps
)(
  ({ removeAsterisk }) => `
  .MuiInputLabel-asterisk {
    display: ${removeAsterisk ? 'none' : 'contents'};
  }
`
)

export const SelectFieldStyled = styled(Select, styledCustomProps)`
  width: 100%;
  .MuiOutlinedInput-notchedOutline {
    legend {
      max-width: ${({ shrinkValue }) => shrinkValue && '100%'};
    }
  }
`

export const MenuItemStyled = styled(MenuItem, styledCustomProps)`
  width: 100%;
  white-space: ${({ expanded }) => (expanded ? 'unset !important' : 'nowrap')};
`

export const MenuItemText = styled('span')`
  display: flex;
  align-items: center;
`

export const BoldText = styled('span')`
  font-weight: bold;
`

export const DescriptionText = styled(
  'span',
  styledCustomProps
)(
  ({ expanded }) => `
  white-space: normal;
  max-width: 1100px;
  display: ${expanded ? 'block' : '-webkit-box'};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
)

export const Placeholder = styled('span')`
  color: grey;
`
