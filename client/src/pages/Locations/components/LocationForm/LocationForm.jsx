import React, { useEffect } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'
import useCountries from 'pages/Locations/hooks/useCountries'
import SelectField from 'components/FormFields/SelectField'
import { getCitiesOptions, getCountriesOptions } from 'services/formOptions'
import { createLocation, getCitiesByCountry } from 'pages/Locations/store/actions'
import { getCitiesSelector } from 'pages/Locations/store/reducers/selectors'
import { EFFECT_LOADING } from 'constants/effectLoading'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import LineLoader from 'components/LineLoader'
import i18n from 'i18n/config'

const LocationForm = ({ location, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [countries] = useCountries()
  const cities = useSelector(getCitiesSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_LOCATION)

  const countriesOptions = getCountriesOptions(countries)
  const citiesOptions = getCitiesOptions(cities)

  useEffect(() => {
    if (countries.length && location) {
      dispatch(getCitiesByCountry(location.country[i18n.language]))
    }
  }, [countries, location])

  const handleSubmit = data => {
    dispatch(createLocation(data, closeModal))
  }

  const handleCountryChange = value => {
    dispatch(getCitiesByCountry(value))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={
        location && {
          ...location,
          country: location.country[i18n.language],
          city: location.city[i18n.language],
          address_de: location.address.de,
          address_ru: location.address.ru,
          address_ua: location.address.ua,
          name_de: location.name.de,
          name_ru: location.name.ru,
          name_ua: location.name.ua
        }
      }
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                1. {t('pages.locations.country')}, {t('pages.locations.city')}
              </div>
              <ColumnsGridStyled columns={3}>
                <SelectField
                  name={'country'}
                  label={t('pages.locations.country')}
                  options={countriesOptions}
                  onHandleChange={handleCountryChange}
                  required
                  removeAsterisk
                />
                {values?.country && (
                  <SelectField
                    name={'city'}
                    label={t('pages.locations.city')}
                    options={citiesOptions}
                    required
                    removeAsterisk
                  />
                )}
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>2. {t('pages.locations.address')}</div>
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
              <div>3. {t('pages.locations.name')}</div>
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
              {loading ? (
                <LineLoader />
              ) : (
                <Button type={'submit'}>{location ? t('common.edit') : t('common.add')}</Button>
              )}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default LocationForm
