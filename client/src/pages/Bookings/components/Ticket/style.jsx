import { styled } from '@mui/system'
import Button from 'components/Button'

export const DownloadTicket = styled(Button)`
  width: 100%;
  border-radius: 0px;
`

export const TicketBackground = styled('div')`
  background-color: #eff1f4;
  padding: 20px;
`

export const TicketData = styled('div')`
  display: flex;
  flex-direction: column;
  width: 800px;
  min-height: 1100px;
  height: 1100px;
  margin: 0px auto;
  padding: 20px 40px 0px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  background-color: rgb(255, 255, 255);
`

export const TicketLogo = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  > img {
    width: 200px;
    height: 124px;
  }
  > span {
    font-size: 44px;
    font-weight: 500;
    margin-left: 20px;
  }
`

export const TicketUserBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const UserRightBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 220px;
  > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;x
  }
`

export const ReiseText = styled('div')`
  font-size: 10px;
  text-decoration: underline;
  margin-bottom: 8px;
`

export const CheckBlock = styled('div')`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`

export const CheckTableBlock = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 20px;
  padding: 4px 0px;
  border-top: 1px solid #a6acb1;
  p:nth-of-type(1) {
    flex: 0 0 105px;
  }
  p:nth-of-type(2) {
    flex: 0 0 108px;
  }
  p:nth-of-type(3) {
    flex-grow: 1;
  }
  p:nth-of-type(4) {
    flex: 0 0 110px;
  }
  p:nth-of-type(5) {
    flex: 0 0 92px;
    text-align: end;
  }
  p:nth-of-type(6) {
    flex: 0 0 92px;
    text-align: end;
  }
`

export const BusInfoBlock = styled('div')`
  display: flex;
  align-items: center;
  gap: 32px;
  min-height: 20px;
  padding: 4px 0px;
  border-top: 1px solid #a6acb1;
  margin-bottom: 20px;
  span {
    font-weight: 500;
  }
`

export const ParticipantBlock = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 20px;
  padding: 4px 0px;
  border-bottom: 1px solid #a6acb1;
  p:nth-of-type(1) {
    flex-grow: 1;
  }
  p:nth-of-type(2) {
    flex: 0 0 80px;
    margin-right: 12px;
    text-align: end;
  }
  p:nth-of-type(3) {
    flex: 0 0 100px;
  }
  p:nth-of-type(4) {
    flex: 0 0 40px;
    display: flex;
    gap: 12px;
    width: 40px;
    margin-right: 12px;
  }
  p:nth-of-type(5) {
    flex: 0 0 120px;
  }
  p:nth-of-type(6) {
    flex: 0 0 80px;
    text-align: end;
  }
`

export const PaymentBlock = styled('div')`
  gap: 16px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  min-height: 20px;
  padding: 4px 0px;
  font-weight: 600;
  > p:first-of-type {
    margin-left: auto;
  }
`

export const InvoiceText = styled('div')`
  margin-top: 20px;
`

export const FooterBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
  padding: 4px 0px 20px;
  border-top: 1px solid #a6acb1;
  break-after: page;
  > div {
    flex-grow: 1;
    flex-basis: calc((100% - 20px * (3 - 1)) / 3);
    display: flex;
    flex-direction: column;
    gap: 4px;
    > p {
      display: flex;
      gap: 12px;
    }
  }
`
