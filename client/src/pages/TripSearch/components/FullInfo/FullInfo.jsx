import React from 'react'
import { useTranslation } from 'react-i18next'

import { FullInfoBlock } from './style'

import useCurrentLang from 'services/hooks/useCurrentLang'

const FullInfo = ({ fullinfoData }) => {
  const { t } = useTranslation()
  const { currentLangCode } = useCurrentLang()

  return (
    <FullInfoBlock>
      <div>
        <b>{t('pages.tripSearch.discounts')}:</b>
        <div>
          {fullinfoData.discounts.map((item, index) => (
            <div key={index}>
              {item.name[currentLangCode.toLowerCase()]} - {item.value}%
            </div>
          ))}
        </div>
      </div>
      <div>
        <b>{t('pages.tripSearch.baggage')}:</b>
        <div>
          {fullinfoData.baggage.map((item, index) => (
            <div key={index}>
              {item.name[currentLangCode.toLowerCase()]} - {item.value}%
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <b>{t('pages.tripSearch.route')}:</b>{' '}
          <span>
            {fullinfoData.main_trip_direction.departure.city[currentLangCode.toLowerCase()]} -{' '}
            {fullinfoData.main_trip_direction.arrival.city[currentLangCode.toLowerCase()]}
          </span>
        </div>
        <div>
          <b>{t('pages.tripSearch.departurePoint')}:</b>{' '}
          <span>
            {fullinfoData.departure.city[currentLangCode.toLowerCase()]},{' '}
            {fullinfoData.departure.address[currentLangCode.toLowerCase()]}
          </span>
        </div>
        <div>
          <b>{t('pages.tripSearch.arrivalLocation')}:</b>{' '}
          <span>
            {fullinfoData.arrival.city[currentLangCode.toLowerCase()]},{' '}
            {fullinfoData.arrival.address[currentLangCode.toLowerCase()]}
          </span>
        </div>
      </div>
    </FullInfoBlock>
  )
}

export default FullInfo
