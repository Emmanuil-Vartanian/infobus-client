import React from 'react'

import { ButtonCellStyled } from './style'

const ButtonCell = props => {
  const {
    row,
    column: { columnDef }
  } = props

  const { value, title } = columnDef.meta.buttonTitle(row.original)

  const handleClick = e => {
    e.stopPropagation()
    if (columnDef.meta.buttonClick && typeof columnDef.meta.buttonClick === 'function') {
      columnDef.meta.buttonClick(row.original, value)
    }
  }

  return (
    <ButtonCellStyled onClick={handleClick}>
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </ButtonCellStyled>
  )
}

export default ButtonCell
