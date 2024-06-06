import { styled } from '@mui/system'

export const Header = styled('header')`
  background-color: #63060a;
  color: #fff;
  padding: 10px 40px;
  @media (max-width: 500px) {
    padding: 10px 20px;
  }
`

export const Logo = styled('div')`
  cursor: pointer;
  font-size: 20px;
  font-weight: 800;
`

export const LoginBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LoginToAccount = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 16px;
  padding: 0 8px;
  border: 1px solid transparent;
  height: 32px;
  font-size: 14px;
  transition: all 0.2s;
  :hover {
    border: 1px solid #fff;
    border-radius: 4px;
  }
  @media (max-width: 400px) {
    margin-right: 0px;
  }
`

export const TouristCentreBlock = styled('div')`
  text-align: center;
  padding: 20px 0px 50px;

  > div {
    font-size: 20px;
    font-weight: 600;

    :first-of-type {
      font-size: 40px;
      margin-bottom: 10px;
      @media (max-width: 400px) {
        font-size: 32px;
      }
    }

    @media (max-width: 400px) {
      font-size: 18px;
    }
  }

  @media (max-width: 400px) {
    padding: 20px 0px 30px;
  }
`
