import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Resources
import ru from '../languages/ru'
import de from '../languages/de'
import ua from '../languages/ua'

export const resources = {
  ru: { translation: ru },
  de: { translation: de },
  ua: { translation: ua }
}

// Init
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources,
      lng: 'ru',
      fallbackLng: {
        'ru-RU': ['ru'],
        'de-DE': ['de'],
        'uk-UA': ['ua'],
        default: ['ru']
      },
      debug: false,
      interpolation: {
        escapeValue: false // react already safes from xss
      },
      initImmediate: false,
      react: {
        nsMode: 'default',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b']
      }
      // eslint-disable- next-line consistent-return
    },
    err => {
      if (err) {
        console.error('Error loading translation files', err)
        return err
      }
    }
  )

export default i18n
