import React from 'react'
import { Field } from 'react-final-form'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTranslation } from 'react-i18next'

import { CheckboxFormControlStyled, CheckboxStyled } from './style'
import { ErrorMessage } from '../style'

const CheckboxField = props => {
  const { t } = useTranslation()

  const {
    name,
    label,
    onHandleChange,
    disabled,
    validation,
    initialValue,
    flexDirection = 'column-reverse',
    ...prop
  } = props

  const handleChange = onChange => event => {
    onChange(event)

    if (typeof onHandleChange === 'function') {
      onHandleChange(event)
    }
  }

  return (
    <Field name={name} type={'checkbox'} initialValue={initialValue} validate={validation}>
      {({ input, meta }) => {
        const fieldError = meta.error && meta.touched

        return (
          <CheckboxFormControlStyled flexDirection={flexDirection} {...prop}>
            <FormControlLabel
              control={
                <CheckboxStyled
                  checked={input.checked}
                  onChange={handleChange(input.onChange)}
                  name={input.name}
                  color={'primary'}
                  disabled={disabled}
                />
              }
              label={label}
            />
            {fieldError && <ErrorMessage>{t(meta.error)}</ErrorMessage>}
          </CheckboxFormControlStyled>
        )
      }}
    </Field>
  )
}

export default CheckboxField
