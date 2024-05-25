import React from 'react'
import { useNavigate } from 'react-router'

import { ROUTES } from 'constants/routes'
import LanguageSwitch from 'containers/LanguageSwitch'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const notFound = () => {
    navigate(ROUTES.BOOKINGS_PAGE)
  }

  return (
    <div>
      <LanguageSwitch />
      {t('signIn.logIn')}
      <div onClick={notFound}>BOOKINGS</div>
    </div>
  )
}

export default Login
