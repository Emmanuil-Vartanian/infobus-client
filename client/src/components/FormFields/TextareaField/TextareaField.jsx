import React from 'react'
import { Field } from 'react-final-form'

import { TextareaBlock } from './style'

const TextareaField = props => {
  const { initialValue, name, placeholder, label, onHandleChange, validation } = props

  const handleChange = onChange => event => {
    const value = event.target.value

    onChange(value)

    if (typeof onHandleChange === 'function') {
      onHandleChange(value)
    }
  }

  return (
    <Field name={name} initialValue={initialValue} validate={validation}>
      {({ input }) => {
        return (
          <div>
            <label>{label}</label>

            <TextareaBlock>
              <textarea
                name={name}
                rows="10"
                placeholder={placeholder}
                value={input.value}
                onChange={handleChange(input.onChange)}
              >
                {input.value}
              </textarea>
            </TextareaBlock>
          </div>
        )
      }}
    </Field>
  )
}

export default TextareaField
