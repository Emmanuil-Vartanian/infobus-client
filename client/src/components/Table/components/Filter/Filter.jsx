import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-final-form'
import CloseIcon from '@mui/icons-material/Close'

import { FilterContainer, FieldsBlock } from './style'

import Button from 'components/Button'
import SelectField from 'components/FormFields/SelectField'

const Filter = ({ dataFilter, defaultData, filterSelect, setDataFilter }) => {
  const { t } = useTranslation()

  const handleFormSubmit = data => {
    setDataFilter(data)
  }

  const handleResetFilter = form => () => {
    setDataFilter(null)
    form.reset()
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <form id={'search-filter'} onSubmit={handleSubmit}>
            <FilterContainer>
              {dataFilter ? (
                <Button
                  variant="outlined"
                  type="submit"
                  size="small"
                  startIcon={<CloseIcon />}
                  onClick={handleResetFilter(form)}
                >
                  {t('filterForTable.clear')}
                </Button>
              ) : null}
              {filterSelect(defaultData).map(({ name, maxWidth, option }, index) => {
                return (
                  <FieldsBlock key={index} maxWidth={maxWidth}>
                    <SelectField
                      name={name}
                      label={t(`filterForTable.${name}`)}
                      options={option()}
                      tableSelect
                    />
                  </FieldsBlock>
                )
              })}
              <Button variant="outlined" type="submit" size="small">
                {t('filterForTable.button')}
              </Button>
            </FilterContainer>
          </form>
        )
      }}
    />
  )
}

export default Filter
