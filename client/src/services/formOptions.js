import i18n from 'i18n/config'
import { LANGUAGES } from 'constants/languages'

export function getLangOptions() {
  const languages = Object.keys(LANGUAGES)

  const options = languages.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`languages.${item}`),
      value: item
    }
  })

  return options
}
