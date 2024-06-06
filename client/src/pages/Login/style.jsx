import { styled } from '@mui/system'

export const AuthBackground = styled('div')(
  ({ token }) =>
    !token &&
    `
  height: calc(100% - 205px);
  background-color: #eff1f4;
  padding: 60px 40px 0;

  @media (max-width: 500px) {
    padding: 60px 20px 0;
    height: calc(100% - 255px);
  }

  @media (max-width: 460px) {
    height: calc(100% - 280px);
  }

  @media (max-width: 400px) {
    height: calc(100% - 235px);
  }
`
)

export const FormBlock = styled('form')`
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 4px;
  box-shadow:
    0 0.5px 1px rgba(0, 0, 0, 0.1),
    0 2px 6px rgba(90, 100, 109, 0.2);
`
