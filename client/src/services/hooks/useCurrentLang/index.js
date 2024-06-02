import { useSelector } from 'react-redux'

import { getLangOptions } from 'services/formOptions'
import { profileLanguageSelector } from 'containers/App/store/reducers/selectors'

const useCurrentLang = () => {
  const profileLanguage = useSelector(profileLanguageSelector)
  const langOptions = getLangOptions()

  const currentLang = langOptions?.filter(item => item.value === profileLanguage)[0]

  return {
    currentLangCode: currentLang.value.toString(),
    currentLangLowerCase: currentLang.value.toLowerCase()
  }
}

export default useCurrentLang
