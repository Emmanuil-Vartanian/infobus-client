import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Header, LoginBlock, Logo, LoginToAccount, TouristCentreBlock } from './style'

import LanguageSwitch from 'containers/LanguageSwitch'
import { ROUTES } from 'constants/routes'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'

const AuthHeader = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const token = useSelector(getCurrentUserTokenSelector)

  const handleGoToHome = () => {
    const url = token ? ROUTES.BOOKINGS_PAGE : ROUTES.TRIP_SEARCH_PAGE
    navigate(url)
  }

  const handleGoToLogin = () => {
    navigate(ROUTES.LOGIN_PAGE)
  }

  return (
    <Header>
      <LoginBlock>
        <Logo onClick={handleGoToHome}>Avtobus</Logo>
        <LoginBlock>
          <LoginToAccount onClick={handleGoToLogin}>
            {t('pages.signIn.loginToAccount')}
          </LoginToAccount>
          <LanguageSwitch />
        </LoginBlock>
      </LoginBlock>
      <TouristCentreBlock>
        <div>{t('pages.signIn.touristCentre')}</div>
        <div>{t('pages.signIn.bookingSystem')}</div>
      </TouristCentreBlock>
    </Header>
  )
}

export default AuthHeader
