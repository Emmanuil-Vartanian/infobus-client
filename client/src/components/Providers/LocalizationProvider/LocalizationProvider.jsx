import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import moment from 'moment'

import 'moment/dist/locale/uk'
import 'moment/dist/locale/ru'
import 'moment/dist/locale/de'

import { profileLanguageSelector } from 'containers/App/store/reducers/selectors'
import useCurrentLang from 'services/hooks/useCurrentLang'

const LocalizationProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const profileLanguage = useSelector(profileLanguageSelector)
  const { currentLangLowerCase } = useCurrentLang()

  const currentLang = currentLangLowerCase === 'ua' ? 'uk' : currentLangLowerCase

  useEffect(() => {
    if (profileLanguage) {
      i18n.changeLanguage(currentLangLowerCase)
      moment.locale(currentLang)
    }
  }, [i18n, profileLanguage])

  return <>{children}</>
}

export default LocalizationProvider
