import React from 'react'
import { useDispatch } from 'react-redux'

import { LanguagesBlock, Language } from './style'

import { profileLanguageToStore } from 'containers/App/store/actions'
import useCurrentLang from 'services/hooks/useCurrentLang'
import { getLangOptions } from 'services/formOptions'

const LanguageSwitch = () => {
  const dispatch = useDispatch()
  const { currentLangCode } = useCurrentLang()
  const languagesOptions = getLangOptions()

  const handleChangeLanguage = value => () => {
    dispatch(profileLanguageToStore(value))
  }

  return (
    <LanguagesBlock>
      {languagesOptions.map(({ value }, index) => (
        <Language
          key={index}
          onClick={handleChangeLanguage(value)}
          active={currentLangCode === value}
        >
          {value}
        </Language>
      ))}
    </LanguagesBlock>
  )
}

export default LanguageSwitch
