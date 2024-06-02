import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'

import { FormBlock, AuthBackground } from './style'

import AuthHeader from 'components/AuthHeader'
import Button from 'components/Button'
import InputField from 'components/FormFields/InputField'
import { signIn } from './store/actions'
import { ColumnsGrid, ErrorMessage } from 'components/FormFields/style'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import CircularProgress from 'components/CircularProgress'

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.LOGIN_PAGE)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = data => {
    dispatch(signIn(data, setErrorMessage))
    handleResetErrorMessage()
  }

  const handleResetErrorMessage = () => {
    setErrorMessage(null)
  }

  return (
    <>
      <AuthHeader />
      <AuthBackground>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <FormBlock onSubmit={handleSubmit}>
              <ColumnsGrid columns={1}>
                <InputField
                  name={'email'}
                  label={t('pages.signIn.email')}
                  onFocus={handleResetErrorMessage}
                  required
                  removeAsterisk
                />
                <InputField
                  name={'password'}
                  label={t('pages.signIn.password')}
                  type={'password'}
                  onFocus={handleResetErrorMessage}
                  required
                  removeAsterisk
                />
                {loading ? (
                  <CircularProgress size={44} />
                ) : (
                  <Button variant="contained" color="primary" type="submit" id="submit">
                    {t('pages.signIn.logIn')}
                  </Button>
                )}
                {errorMessage === 'Unauthorized' && (
                  <ErrorMessage>{t('pages.signIn.wrongLoginOrPassword')}</ErrorMessage>
                )}
              </ColumnsGrid>
            </FormBlock>
          )}
        />
      </AuthBackground>
    </>
  )
}

export default Login
