import React, { useEffect } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'
import SelectField from 'components/FormFields/SelectField'
import { getConsolidatorsOptions, getEnterpriseFormOptions } from 'services/formOptions'
import { changeAgency, createAgency } from 'pages/Agencies/store/actions'
import LineLoader from 'components/LineLoader'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getConsolidators } from 'pages/Users/store/actions'
import { getConsolidatorsSelector } from 'pages/Users/store/reducers/selectors'

const AgencyForm = ({ agency, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const createLoading = useLoadingEffect(EFFECT_LOADING.CREATE_AGENCY)
  const changeLoading = useLoadingEffect(EFFECT_LOADING.CHANGE_AGENCY)
  const consolidators = useSelector(getConsolidatorsSelector)

  const enterpriseFormOptions = getEnterpriseFormOptions()
  const groupOptions = getConsolidatorsOptions(consolidators)

  useEffect(() => {
    if (agency) {
      dispatch(getConsolidators())
    }
  }, [agency])

  const handleSubmit = data => {
    if (agency) {
      dispatch(changeAgency(data, closeModal))
    } else {
      dispatch(createAgency(data, closeModal))
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={agency}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <strong>{t('pages.agencies.form.1.title')}</strong>
              <div style={{ fontSize: '14px' }}>{t('pages.agencies.form.1.description')}</div>
              <ColumnsGridStyled columns={2}>
                <InputField
                  name={'name'}
                  label={t('pages.agencies.form.1.fullName')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'short_name'}
                  label={t('pages.agencies.form.1.shortName')}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <strong>{t('pages.agencies.form.2.title')}</strong>
              <div style={{ fontSize: '14px' }}>{t('pages.agencies.form.2.description')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'street'}
                  label={t('pages.agencies.street')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'postal_code'}
                  label={t('pages.agencies.postalCode')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'city'}
                  label={t('pages.agencies.city')}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <strong>{t('pages.agencies.form.3.title')}</strong>
              <div style={{ fontSize: '14px' }}>{t('pages.agencies.form.3.description')}</div>
              <ColumnsGridStyled columns={3}>
                <InputField
                  name={'contact_tel'}
                  label={t('pages.agencies.tel')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'contact_fax'}
                  label={t('pages.agencies.fax')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'contact_email'}
                  label={t('pages.agencies.email')}
                  type={'email'}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <strong>{t('pages.agencies.form.4.title')}</strong>
              <ColumnsGridStyled columns={2}>
                <InputField
                  name={'tax'}
                  label={t('pages.agencies.taxNumber')}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'enterprise_owner'}
                  label={t('pages.agencies.owner')}
                  required
                  removeAsterisk
                />
              </ColumnsGridStyled>
            </div>
            <br />
            <div>
              <strong>{t('pages.agencies.form.5.title')}</strong>
              <ColumnsGridStyled columns={2}>
                <SelectField
                  name={'enterprise_status'}
                  label={t('pages.agencies.form.5.enterpriseForm')}
                  options={enterpriseFormOptions}
                  required
                  removeAsterisk
                />
                <SelectField
                  name={'consolidator_id'}
                  label={t('pages.agencies.group')}
                  options={groupOptions}
                />
              </ColumnsGridStyled>
            </div>
            {!agency ? (
              <>
                <br />
                <div>
                  <strong>{t('pages.agencies.form.6.title')}</strong>
                  <div style={{ fontSize: '14px' }}>{t('pages.agencies.form.6.description')}</div>
                  <ColumnsGridStyled columns={2}>
                    <InputField
                      name={'email'}
                      label={t('pages.agencies.email')}
                      type={'email'}
                      required
                      removeAsterisk
                    />
                    <InputField
                      name={'password'}
                      label={t('pages.agencies.password')}
                      type={'password'}
                      required
                      removeAsterisk
                    />
                  </ColumnsGridStyled>
                </div>
              </>
            ) : null}
            <ButtonBlock>
              {createLoading || changeLoading ? (
                <LineLoader />
              ) : (
                <Button type={'submit'}>{agency ? t('common.edit') : t('common.add')}</Button>
              )}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default AgencyForm
