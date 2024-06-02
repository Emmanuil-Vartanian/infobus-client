import React, { useState } from 'react'
import { Field } from 'react-final-form'
import { Autocomplete, Chip, Tooltip } from '@mui/material'
import { isArray } from 'lodash'

import { AutocompleteContainer } from './style'
import { MenuItemStyled, MenuItemText } from '../SelectField/style'

import InputField from '../InputField'

const SearchBySelectField = props => {
  const {
    name,
    label,
    options,
    initialValue,
    removeAsterisk,
    onHandleChange,
    onHandleDeleteTag,
    validation,
    error,
    disabled,
    infoIconTitle,
    handleAfterClose,
    limitTags = 5,
    ...rest
  } = props
  const [inputValue, setInputValue] = useState('')

  const handleChange = input => (e, options, reason, details) => {
    input.onChange(options)
    setInputValue('')

    if (typeof onHandleChange === 'function') {
      onHandleChange(details?.option, options)
    }
  }

  const handleDeleteTag = (input, option) => () => {
    const inputValue = isArray(input.value) ? input.value : [input.value]

    const newOptions = inputValue.filter(item => {
      if (option.text !== item.text) {
        return item
      }
    })

    input.onChange(newOptions)

    if (typeof onHandleDeleteTag === 'function') {
      onHandleDeleteTag(option, newOptions)
    }
  }

  const handleClose = () => {
    if (typeof handleAfterClose === 'function') {
      handleAfterClose()
    }
  }

  return (
    <Field name={name} initialValue={initialValue}>
      {({ input }) => {
        return (
          <AutocompleteContainer>
            <Autocomplete
              id={name}
              options={options}
              value={input.value || null}
              inputValue={input.value.text || inputValue}
              onChange={handleChange(input)}
              onClose={handleClose}
              multiple={false}
              disabled={disabled}
              getOptionLabel={option => option.text || ''}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value || option.text === value.value
              }
              limitTags={limitTags}
              loading={true}
              renderOption={(optionProps, option) => {
                return (
                  <MenuItemStyled
                    {...optionProps}
                    key={`item-${name}-${option.id}`}
                    value={option.value}
                    selected={false}
                  >
                    <MenuItemText>{option.text}</MenuItemText>
                  </MenuItemStyled>
                )
              }}
              renderInput={params => {
                return (
                  <InputField
                    {...params}
                    name={name}
                    label={label}
                    onChange={e => setInputValue(e.target.value)}
                    required={rest?.required && !Object.keys(input.value)?.length}
                    removeAsterisk={removeAsterisk}
                    error={error}
                    validation={validation}
                    infoIconTitle={infoIconTitle}
                  />
                )
              }}
              renderTags={(values, getTagProps) => {
                return values.map((option, index) => {
                  return (
                    <Tooltip key={index} placement={'bottom'} title={option.text || ''}>
                      <Chip
                        variant="outlined"
                        label={option.text}
                        {...getTagProps({ index })}
                        onDelete={handleDeleteTag(input, option)}
                      />
                    </Tooltip>
                  )
                })
              }}
            />
          </AutocompleteContainer>
        )
      }}
    </Field>
  )
}

export default SearchBySelectField
