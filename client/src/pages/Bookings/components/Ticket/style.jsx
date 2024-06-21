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
  > p:nth-of-type(1) {
    flex: 0 0 105px;
  }
  > p:nth-of-type(2) {
    flex: 0 0 108px;
  }
  > p:nth-of-type(3) {
    flex-grow: 1;
  }
  > p:nth-of-type(4) {
    flex: 0 0 110px;
  }
  > p:nth-of-type(5) {
    flex: 0 0 92px;
    text-align: end;
  }
  > p:nth-of-type(6) {
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
  span {
    font-weight: 500;
  }
  > p:nth-of-type(1) {
    flex: 0 0 105px;
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

export const RowContainer = styled('div')`
  display: flex;
  align-items: center;
  padding: 4px 0px;
  gap: 16px;
`

export const Row5 = styled(RowContainer)`
  margin-top: 16px;
  color: #3b5ae7;
  gap: 24px;

  p:nth-of-type(1) {
    flex-grow: 1;
  }

  p:nth-of-type(2) {
    flex: 0 0 180px;
  }

  p:nth-of-type(3) {
    flex: 0 0 150px;
  }

  p:nth-of-type(4) {
    flex: 0 0 150px;
    display: flex;
    justify-content: space-between;
  }

  p:nth-of-type(5) {
    flex: 0 0 64px;
  }
`

export const Row6 = styled(RowContainer)`
  gap: 24px;
  color: red;

  p:nth-last-of-type(2) {
    flex: 0 0 120px;
    text-align: end;
    font-weight: 500;
    margin-left: auto;
  }
  p:nth-last-of-type(1) {
    flex: 0 0 80px;
    text-align: end;
  }
`

export const Row7 = styled(Row5)`
  margin-top: 0;
  color: red;
`

export const Row8 = styled(RowContainer)`
  border-top: 1px solid #a6acb1;

  p:nth-last-of-type(2) {
    flex: 0 0 120px;
    text-align: end;
    font-weight: 500;
    margin-left: auto;
  }

  p:nth-last-of-type(1) {
    flex: 0 0 80px;
    text-align: end;
    font-weight: 500;
  }
`

export const Row9 = styled(RowContainer)`
  p:nth-of-type(1) {
    flex: 0 0 168px;
    text-align: end;
  }
  p:nth-of-type(2) {
    flex: 0 0 80px;
    text-align: end;
  }
  p:nth-last-of-type(2) {
    flex: 0 0 120px;
    text-align: end;
    font-weight: 500;
    margin-left: auto;
  }
  p:nth-last-of-type(1) {
    flex: 0 0 80px;
    text-align: end;
  }
`

export const Row10 = styled(RowContainer)`
  p:nth-of-type(1) {
    flex: 0 0 168px;
    text-align: end;
  }
  p:nth-of-type(2) {
    flex: 0 0 80px;
    text-align: end;
  }
  p:nth-last-of-type(2) {
    flex: 0 0 120px;
    text-align: end;
    font-weight: 500;
    margin-left: auto;
  }
  p:nth-last-of-type(1) {
    flex: 0 0 80px;
    text-align: end;
  }
`

export const Row11 = styled(RowContainer)`
  margin-top: 12px;
  font-weight: 600;
  p:nth-last-of-type(2) {
    flex: 0 0 120px;
    text-align: end;
    margin-left: auto;
  }
  p:nth-last-of-type(1) {
    flex: 0 0 80px;
    text-align: end;
  }
`

export const Row12 = styled(RowContainer)`
  gap: 8px;
`
