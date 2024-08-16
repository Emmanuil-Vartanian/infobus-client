import React from 'react'
import { Field } from 'react-final-form'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'

import { TextFieldStyled, FieldWithIcon, TextFieldContainer } from './style'
import { ErrorMessage } from 'components/FormFields/style'

const InputField = props => {
  const {
    initialValue,
    name,
    placeholder,
    label,
    onHandleChange,
    startAdornment,
    endAdornment,
    removeAsterisk,
    inputLabelProps,
    required,
    title,
    validation,
    error,
    infoIconTitle,
    type = 'text',
    ...rest
  } = props
  const [showPassword, setShowPassword] = React.useState(false)
  const { t } = useTranslation()

  const handleChange = onChange => event => {
    onChange(event)

    if (typeof onHandleChange === 'function') {
      onHandleChange(event)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const inputLabelPropsShrink = placeholder && {
    shrink: !!placeholder && !!label
  }

  return (
    <Field name={name} initialValue={initialValue} validate={validation}>
      {({ input, meta }) => {
        const fieldError = meta.error && meta.touched

        return (
          <FieldWithIcon>
            {infoIconTitle ? (
              <Tooltip placement={'bottom'} title={infoIconTitle}>
                <InfoIcon />
              </Tooltip>
            ) : null}
            <TextFieldContainer>
              <TextFieldStyled
                name={input.name}
                value={input.value}
                onChange={handleChange(input.onChange)}
                placeholder={placeholder}
                label={label}
                variant="outlined"
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                removeAsterisk={removeAsterisk}
                title={title || ''}
                required={required}
                error={error || fieldError}
                InputLabelProps={{ ...inputLabelProps, ...inputLabelPropsShrink }}
                InputProps={{
                  inputProps: { min: rest.min, max: rest.max },
                  startAdornment: startAdornment,
                  endAdornment:
                    endAdornment ||
                    (type === 'password' && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          size="medium"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ))
                }}
                {...rest}
              />
              {fieldError && <ErrorMessage>{t(meta.error)}</ErrorMessage>}
            </TextFieldContainer>
          </FieldWithIcon>
        )
      }}
    </Field>
  )
}

export default InputField
