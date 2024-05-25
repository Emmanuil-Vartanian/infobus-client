import React from 'react'
import { useDispatch } from 'react-redux'

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
    <>
      {languagesOptions.map(({ value }, index) => (
        <div key={index} onClick={handleChangeLanguage(value)} style={{ marginRight: '5px' }}>
          <span style={currentLangCode === value ? { color: 'red' } : {}}>{value}</span>
        </div>
      ))}
    </>
  )
}

export default LanguageSwitch
