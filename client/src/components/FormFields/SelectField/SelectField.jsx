import React, { useState } from 'react'
import { Field } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'

import {
  SelectFieldStyled,
  MenuItemText,
  BoldText,
  MenuItemStyled,
  InputLabelStyled,
  Placeholder,
  DescriptionText
} from './style'
import { FormControlStyled, ErrorMessage } from '../style'
import { FieldWithIcon } from '../InputField/style'
import { CheckboxStyled } from '../CheckboxField/style'

const SelectField = props => {
  const {
    name,
    label,
    options,
    initialValue,
    expandDescription,
    onHandleChange,
    maxWidth,
    tableSelect,
    required,
    removeAsterisk,
    placeholder,
    validation,
    error,
    infoIconTitle,
    handleAfterClose,
    onFocus,
    multiple = false,
    ...rest
  } = props
  const { t } = useTranslation()
  const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([])
  const [shrink, setShrink] = useState(false)

  const handleChange = onChange => event => {
    let targetValue = event.target.value

    if (targetValue.includes('all') && targetValue.length - 1 !== options.length) {
      targetValue = options.map(o => o.value)
    } else if (targetValue.includes('all') && targetValue.length - 1 === options.length) {
      targetValue = []
    }

    onChange(targetValue)

    if (typeof onHandleChange === 'function') {
      onHandleChange(targetValue)
    }
  }

  const handleClose = (onChange, value) => event => {
    if (props.selectAllOnEmptyClose && (value === '' || value.length === 0)) {
      event.target.value = options.map(o => o.value)
      onChange(event)
    }
    if (typeof handleAfterClose === 'function') {
      handleAfterClose()
    }
  }

  const renderValue = (multiple, options) => selected => {
    return multiple
      ? options
          .filter(opt => selected.includes(opt.value))
          .map(filtered => filtered.text)
          .join(', ')
      : options.find(opt => opt.value === selected)?.text
  }

  const handleDescriptionClick = (id, event) => {
    if (expandDescription) {
      event.preventDefault()
      event.stopPropagation()

      if (expandedDescriptionIds.includes(id)) {
        setExpandedDescriptionIds(oldIds => oldIds.filter(_id => _id !== id))
      } else {
        setExpandedDescriptionIds(oldIds => [...oldIds, id])
      }
    }
  }

  const handleOpenShrink = () => {
    setShrink(true)
    if (typeof onFocus === 'function') {
      onFocus()
    }
  }

  const handleCloseShrink = () => {
    setShrink(false)
  }

  const getMultipleFiledValue = value => {
    return [...value]
  }

  return (
    <Field name={name} initialValue={initialValue} validate={validation}>
      {({ input, meta }) => {
        const propsBoolValue = multiple ? !!input.value.length : !!input.value
        const shrinkValue = !!placeholder || shrink || propsBoolValue
        const fieldError = meta.error && meta.touched

        return (
          <FieldWithIcon maxWidth={maxWidth}>
            {infoIconTitle ? (
              <Tooltip placement={'bottom'} title={infoIconTitle}>
                <InfoIcon />
              </Tooltip>
            ) : null}
            <FormControlStyled variant="outlined">
              <InputLabelStyled
                id={`label-${name}`}
                className={tableSelect ? 'table-select-lable' : 'select-label'}
                required={placeholder ? input.value === initialValue : required}
                removeAsterisk={removeAsterisk}
                shrink={shrinkValue}
                error={error || fieldError}
              >
                {label}
              </InputLabelStyled>

              <SelectFieldStyled
                autoWidth={false}
                labelId={`label-${name}`}
                id={name}
                className={tableSelect && 'table-select'}
                name={input.name}
                value={
                  options.length
                    ? multiple
                      ? getMultipleFiledValue(input.value)
                      : input.value
                    : ''
                }
                onChange={handleChange(input.onChange)}
                onClose={handleClose(input.onChange, input.value)}
                onFocus={handleOpenShrink}
                label={label}
                multiple={multiple}
                displayEmpty={!!placeholder}
                shrinkValue={shrinkValue}
                onBlur={handleCloseShrink}
                error={error || fieldError}
                defaultValue={''}
                renderValue={selected => {
                  if (placeholder && !input.value) {
                    return <Placeholder>{placeholder}</Placeholder>
                  }

                  return renderValue(multiple, options)(selected)
                }}
                required={required}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  PaperProps: {
                    style: {
                      maxHeight: '340px'
                    }
                  },
                  autoFocus: false
                }}
                {...rest}
              >
                {multiple && !!options.length && (
                  <MenuItemStyled key={`item-all`} value={'all'}>
                    <CheckboxStyled
                      color="primary"
                      checked={input.value.length === options.length}
                    />
                    <span>{t('common.selectAll')}</span>
                  </MenuItemStyled>
                )}
                {placeholder && (
                  <MenuItemStyled disabled value="">
                    <span>{placeholder}</span>
                  </MenuItemStyled>
                )}
                {options.map(option => {
                  const checkedValue = Array.isArray(input.value)
                    ? input.value.includes(option.value)
                    : input.value === option.value

                  const expended = expandDescription && expandedDescriptionIds.includes(option.id)

                  return (
                    <MenuItemStyled
                      key={`item-${name}-${option.id}`}
                      value={option.value}
                      selected={false}
                      expanded={expended}
                    >
                      {multiple && <CheckboxStyled color="primary" checked={checkedValue} />}
                      {option.description ? (
                        <Tooltip
                          placement={'bottom'}
                          title={option.text + ' ' + option.description}
                        >
                          <MenuItemText onClick={handleDescriptionClick.bind(this, option.id)}>
                            <BoldText>{option.text}</BoldText>&nbsp;-&nbsp;
                            <DescriptionText expanded={expended}>
                              {option.description}
                            </DescriptionText>
                          </MenuItemText>
                        </Tooltip>
                      ) : (
                        <MenuItemText>{option.text}</MenuItemText>
                      )}
                    </MenuItemStyled>
                  )
                })}
              </SelectFieldStyled>
              {fieldError && <ErrorMessage>{t(meta.error)}</ErrorMessage>}
            </FormControlStyled>
          </FieldWithIcon>
        )
      }}
    </Field>
  )
}

export default SelectField
