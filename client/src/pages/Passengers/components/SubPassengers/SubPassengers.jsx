import React from 'react'
import { useTranslation } from 'react-i18next'

import { PassengersSumBlock, PassengersSumFirstBlock } from 'pages/Passengers/style'

const SubPassengers = ({ data }) => {
  const { t } = useTranslation()

  return (
    <>
      <PassengersSumFirstBlock colSpan={2}>
        <div className="table-cell-body-content" style={{ fontWeight: 600 }}>
          {t('pages.passenger.buch')}:
        </div>
      </PassengersSumFirstBlock>
      <PassengersSumBlock>
        <div className="table-cell-body-content" style={{ justifyContent: 'start' }}>
          {data.buch}
        </div>
      </PassengersSumBlock>
      <PassengersSumBlock colSpan={2}>
        <div className="table-cell-body-content" style={{ fontWeight: 600, justifyContent: 'end' }}>
          {t('pages.passenger.sum')}:
        </div>
      </PassengersSumBlock>
      <PassengersSumBlock>
        <div className="table-cell-body-content">{data.price}€</div>
      </PassengersSumBlock>
      <PassengersSumBlock>
        <div className="table-cell-body-content">
          {data.payment_place === 'office' ? data.price + '€' : '0€'}
        </div>
      </PassengersSumBlock>
      <PassengersSumBlock>
        <div className="table-cell-body-content">
          {data.payment_place === 'bus' ? data.price + '€' : '0€'}
        </div>
      </PassengersSumBlock>
      <PassengersSumBlock colSpan={3}>
        <div className="table-cell-body-content" style={{ fontWeight: 600, justifyContent: 'end' }}>
          {t('pages.passenger.phone')}:
        </div>
      </PassengersSumBlock>
      <PassengersSumBlock colSpan={2}>
        <div className="table-cell-body-content" style={{ justifyContent: 'start' }}>
          {data.passengers_contact_tel}
        </div>
      </PassengersSumBlock>
    </>
  )
}

export default SubPassengers
