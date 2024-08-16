import React from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'
import SelectField from 'components/FormFields/SelectField'
import { getDiscountsTypeOptions } from 'services/formOptions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import LineLoader from 'components/LineLoader'
import { createDiscount } from 'pages/Discounts/store/actions'

const DiscountForm = ({ discount, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_DISCOUNT)

  const typeOptions = getDiscountsTypeOptions()

  const handleSubmit = data => {
    dispatch(createDiscount(data, closeModal))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={
        discount && {
          ...discount,
          name_de: discount.name.de,
          name_ru: discount.name.ru,
          name_ua: discount.name.ua
        }
      }
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>1. {t('pages.discounts.discountName')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'name_de'}
                  label={`${t('pages.discounts.discountName')} (DE)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ru'}
                  label={`${t('pages.discounts.discountName')} (RU)`}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'name_ua'}
                  label={`${t('pages.discounts.discountName')} (UA)`}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <div>
                2. {t('pages.discounts.discountType')}, {t('pages.discounts.discountSize')},{' '}
                {t('pages.discounts.currency')}
              </div>
              <ColumnsGridStyled columns={3}>
                <SelectField
                  name={'type'}
                  label={t('pages.discounts.discountType')}
                  options={typeOptions}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'value'}
                  label={t('pages.discounts.discountSize')}
                  type={'number'}
                  required
                  removeAsterisk
                />
                <SelectField
                  name={'currency'}
                  label={t('pages.discounts.currency')}
                  options={[{ id: 1, text: 'euro', value: 'euro' }]}
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
                <Button type={'submit'}>{discount ? t('common.edit') : t('common.add')}</Button>
              )}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default DiscountForm
