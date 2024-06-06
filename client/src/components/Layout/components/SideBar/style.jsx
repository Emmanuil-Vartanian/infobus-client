import { styled } from '@mui/system'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import { styledCustomProps } from 'services/styledCustomProps'

export const ListStyled = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
`

export const ListItemButtonStyled = styled(
  ListItemButton,
  styledCustomProps
)(
  ({ open, active }) => `
  min-height: 48px;
  justify-content: ${open ? 'initial' : 'center'};
  &:hover {
    background-color: #63060a;
    .MuiListItemText-secondary,
    .MuiListItemIcon-root {
      color: #fff;
    }
  }
  ${
    active &&
    `background-color: #63060a;
    .MuiListItemText-secondary,
    .MuiListItemIcon-root {
      color: #fff;
    }`
  }
`
)
