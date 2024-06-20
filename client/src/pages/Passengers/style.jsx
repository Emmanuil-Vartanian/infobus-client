import { styled } from '@mui/system'

export const PassengerTripBackground = styled('div')`
  background-color: #fff;
  padding: 20px;
  .MuiTableRow-root {
    background: #fff;
  }
  .row-expand:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`

export const PassengerTripDate = styled('div')`
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`

export const PassengersSumFirstBlock = styled('td')`
  padding: 4px 0px;
  font-size: 13px;
  > div {
    text-align: end;
    padding: 0px 16px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
`

export const PassengersSumBlock = styled('td')`
  border-left: 1px solid #c1c1c1;
  padding: 4px 0px;
  font-size: 13px;
  > div {
    text-align: end;
    padding: 0px 16px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
