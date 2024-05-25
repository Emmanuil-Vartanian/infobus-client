import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { profileLanguageSelector } from 'containers/App/store/reducers/selectors'
import useCurrentLang from 'services/hooks/useCurrentLang'

const LocalizationProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const profileLanguage = useSelector(profileLanguageSelector)
  const { currentLangCode } = useCurrentLang()

  useEffect(() => {
    if (profileLanguage) {
      i18n.changeLanguage(currentLangCode.toLowerCase())
    }
  }, [currentLangCode, i18n, profileLanguage])

  return <>{children}</>
}

export default LocalizationProvider
