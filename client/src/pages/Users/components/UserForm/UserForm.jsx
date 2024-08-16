import React from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { getAccessOptions } from 'services/formOptions'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import Button from 'components/Button'
import InputField from 'components/FormFields/InputField'
import SelectField from 'components/FormFields/SelectField'
import { ColumnsGrid } from 'components/FormFields/style'
import LineLoader from 'components/LineLoader'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { ButtonBlock } from 'pages/Locations/style'
import { changeUser } from 'pages/Users/store/actions'

const UserForm = ({ user, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.CHANGE_USER)

  const accessOptions = getAccessOptions()

  const handleSubmit = data => {
    dispatch(changeUser(data, onClose))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ ...user, active: user?.active ? 'active' : 'notActive' }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <ColumnsGrid columns={2}>
              <InputField
                name={'password'}
                label={t('pages.users.newPassword')}
                type={'password'}
              />
              <SelectField
                name={'active'}
                label={t('pages.users.access')}
                options={accessOptions}
              />
            </ColumnsGrid>
            <ButtonBlock>
              {loading ? (
                <LineLoader />
              ) : (
                <Button type={'submit'}>{user ? t('common.edit') : t('common.add')}</Button>
              )}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default UserForm
