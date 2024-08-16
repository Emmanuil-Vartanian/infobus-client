import React from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'
import SelectField from 'components/FormFields/SelectField'
import { getBaggageTypeOptions } from 'services/formOptions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import LineLoader from 'components/LineLoader'
import { createBaggage } from 'pages/Baggage/store/actions'

const BaggageForm = ({ baggage, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_BAGGAGE)

  const typeOptions = getBaggageTypeOptions()

  const handleSubmit = data => {
    dispatch(createBaggage(data, closeModal))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={
        baggage && {
          ...baggage,
          name_de: baggage.name.de,
          name_ru: baggage.name.ru,
          name_ua: baggage.name.ua
        }
      }
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>1. {t('pages.baggage.name')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'name_de'}
                  label={`${t('pages.baggage.name')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ru'}
                  label={`${t('pages.baggage.name')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ua'}
                  label={`${t('pages.baggage.name')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>
                2. {t('pages.baggage.type')}, {t('pages.baggage.value')}, {t('pages.baggage.units')}
              </div>
              <ColumnsGridStyled columns={3}>
                <SelectField
                  name={'type'}
                  label={t('pages.baggage.type')}
                  options={typeOptions}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'value'}
                  label={t('pages.baggage.value')}
                  type={'number'}
                  required
                  removeAsterisk
                />
                <SelectField
                  name={'units'}
                  label={t('pages.baggage.units')}
                  options={[
                    { id: 1, text: 'euro', value: 'euro' },
                    { id: 1, text: 'kg', value: 'kg' }
                  ]}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <ButtonBlock>
              {loading ? (
                <LineLoader />
              ) : (
                <Button type={'submit'}>{baggage ? t('common.edit') : t('common.add')}</Button>
              )}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default BaggageForm
