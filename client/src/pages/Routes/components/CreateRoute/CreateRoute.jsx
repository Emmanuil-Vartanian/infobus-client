import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import LineLoader from 'components/LineLoader'
import Button from 'components/Button'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import SelectField from 'components/FormFields/SelectField'
import useCountries from 'pages/Locations/hooks/useCountries'
import { getCitiesOptions, getCountriesOptions } from 'services/formOptions'
import useCities from 'pages/Locations/hooks/useCities'
import i18n from 'i18n/config'
import { createRoute } from 'pages/Routes/store/actions'

const CreateRoute = ({ closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [countries] = useCountries()
  const [cities] = useCities()
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_ROUTE)
  const [countStop, setCountStop] = useState([])

  const countriesOptions = getCountriesOptions(countries)

  const citiesOptions = country => {
    const filterCities = cities.filter(city => city.country[i18n.language] === country)
    return getCitiesOptions(filterCities)
  }

  const handleSubmit = data => {
    dispatch(createRoute(data, closeModal))
  }

  const handleAddStop = () => {
    setCountStop(prev => [...prev, prev.length + 1])
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>{t('pages.routes.departurePoint')}</div>
              <ColumnsGridStyled columns={2}>
                <SelectField
                  name={'departure_country'}
                  label={t('pages.locations.country')}
                  options={countriesOptions}
                  required
                  removeAsterisk
                />
                {values?.departure_country && (
                  <SelectField
                    name={'departure_city'}
                    label={t('pages.locations.city')}
                    options={citiesOptions(values?.departure_country)}
                    required
                    removeAsterisk
                  />
                )}
              </ColumnsGridStyled>
            </div>
            <br />
            {values?.departure_city && (
              <>
                <div>
                  <div>{t('pages.routes.arrivalPoint')}</div>
                  <ColumnsGridStyled columns={2}>
                    <SelectField
                      name={'arrival_country'}
                      label={t('pages.locations.country')}
                      options={countriesOptions}
                      required
                      removeAsterisk
                    />
                    {values?.arrival_country && (
                      <SelectField
                        name={'arrival_city'}
                        label={t('pages.locations.city')}
                        options={citiesOptions(values?.arrival_country)}
                        required
                        removeAsterisk
                      />
                    )}
                  </ColumnsGridStyled>
                </div>
                <br />
              </>
            )}
            {values?.arrival_city && (
              <div>
                <div>{t('pages.routes.stoppingPlaces')}</div>
                {countStop.length
                  ? countStop.map(item => (
                      <Fragment key={item}>
                        <div>
                          {t('pages.routes.stop')} {item}
                        </div>
                        <ColumnsGridStyled columns={2}>
                          <SelectField
                            name={`stop_country_${item}`}
                            label={t('pages.locations.country')}
                            options={countriesOptions}
                            required
                            removeAsterisk
                          />
                          {values?.[`stop_country_${item}`] && (
                            <SelectField
                              name={`stop_city_${item}`}
                              label={t('pages.locations.city')}
                              options={citiesOptions(values?.[`stop_country_${item}`])}
                              required
                              removeAsterisk
                            />
                          )}
                        </ColumnsGridStyled>
                        <br />
                      </Fragment>
                    ))
                  : null}
                <Button type={'button'} onClick={handleAddStop} size={'small'}>
                  {t('pages.routes.addStop')}
                </Button>
              </div>
            )}
            {values?.arrival_city && (
              <div>
                <br />
                <div>
                  <div>{t('pages.routes.route')}</div>
                  <div>
                    {values?.departure_city} -{' '}
                    {countStop.map(
                      item => values?.[`stop_city_${item}`] && `${values?.[`stop_city_${item}`]} - `
                    )}{' '}
                    {values?.arrival_city}
                  </div>
                </div>
                <br />
                <div>
                  <div>{t('pages.routes.reverseRoute')}</div>
                  <div>
                    {values?.arrival_city} -{' '}
                    {[...countStop]
                      .reverse()
                      .map(
                        item =>
                          values?.[`stop_city_${item}`] && `${values?.[`stop_city_${item}`]} - `
                      )}{' '}
                    {values?.departure_city}
                  </div>
                </div>
              </div>
            )}
            <ButtonBlock>
              {loading ? <LineLoader /> : <Button type={'submit'}>{t('common.add')}</Button>}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default CreateRoute
