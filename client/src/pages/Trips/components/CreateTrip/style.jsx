import { styled } from '@mui/system'
import Button from 'components/Button'
import { styledCustomProps } from 'services/styledCustomProps'

export const CheckboxFieldBlock = styled('div')`
  margin-top: 20px;
  margin-left: 4px;
`

export const RoutePointsBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
`

export const AddSeasonPrice = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-left: 10px;
  }
`

export const СhooseSeatsButton = styled(
  Button,
  styledCustomProps
)(
  ({ active }) => `
  background-color: ${active ? '#63060a' : '#bdbdbd'};
`
)
