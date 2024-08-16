import { styled } from '@mui/system'
import { ColumnsGrid } from 'components/FormFields/style'

export const TripsTableBlock = styled('div')`
  margin-top: 30px;

  > div:first-of-type {
    margin-bottom: 20px;
  }
`

export const ColumnsGridStyled = styled(ColumnsGrid)(
  ({ columns }) => `
  @media (max-width: 600px) {
    grid-template-columns: repeat(${columns === 3 ? '2' : '1'}, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
)
