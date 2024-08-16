import { styled } from '@mui/system'

export const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export const SeatsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 460px;
`

export const SeatBlock = styled('div')`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4caf50;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &.empty {
    visibility: hidden;
  }

  &.booked {
    background: #b6060e;
  }

  &.disabled {
    background: #63060a;
  }
`

export const SeatsStatus = styled('div')`
  display: flex;
  align-items: center;
  height: fit-content;
  margin-bottom: 10px;

  > div {
    width: 25px;
    height: 25px;
  }
`
