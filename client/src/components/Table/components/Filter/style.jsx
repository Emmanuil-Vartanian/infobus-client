import { styled } from '@mui/system'
import { styledCustomProps } from 'services/styledCustomProps'

export const FilterContainer = styled('div')`
  margin-bottom: 20px;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
`

export const FieldsBlock = styled(
  'div',
  styledCustomProps
)(
  ({ maxWidth }) => `
  width: 100%;
  max-width: ${maxWidth}px;
`
)
