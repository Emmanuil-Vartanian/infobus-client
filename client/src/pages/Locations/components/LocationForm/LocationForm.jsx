import React from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'

const LocationForm = ({ location }) => {
  const { t } = useTranslation()

  console.log('location', location)

  const handleSubmit = data => {
    console.log('data', data)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>1. {t('pages.locations.country')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'country_de'}
                  label={`${t('pages.locations.country')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'country_ru'}
                  label={`${t('pages.locations.country')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'country_ua'}
                  label={`${t('pages.locations.country')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>2. {t('pages.locations.city')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'city_de'}
                  label={`${t('pages.locations.city')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'city_ru'}
                  label={`${t('pages.locations.city')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'city_ua'}
                  label={`${t('pages.locations.city')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>3. {t('pages.locations.address')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'address_de'}
                  label={`${t('pages.locations.address')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'address_ru'}
                  label={`${t('pages.locations.address')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'address_ua'}
                  label={`${t('pages.locations.address')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>4. {t('pages.locations.name')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'name_de'}
                  label={`${t('pages.locations.name')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ru'}
                  label={`${t('pages.locations.name')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ua'}
                  label={`${t('pages.locations.name')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <ButtonBlock>
              <Button type={'submit'}>{t('common.add')}</Button>
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default LocationForm
