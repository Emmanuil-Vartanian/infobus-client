import { styled } from '@mui/system'

export const HeaderBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 60px;
  @media (max-width: 750px) {
    justify-content: end;
    margin-left: 10px;
  }
`

export const TodayBlock = styled('div')`
  text-transform: capitalize;
  font-size: 15px;
  @media (max-width: 750px) {
    display: none;
  }
`

export const UserData = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div:first-of-type {
    font-size: 15px;
    margin-right: 15px;
    @media (max-width: 500px) {
      display: none;
    }
  }
`
