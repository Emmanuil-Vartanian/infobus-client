import React from 'react'
import { IconButton, Tooltip } from '@mui/material'

const IconCell = props => {
  const {
    row,
    column: { columnDef }
  } = props

  const handleClick = onClick => e => {
    e.stopPropagation()
    if (onClick && typeof onClick === 'function') {
      onClick(row.original, row)
    }
  }

  return columnDef.meta.showColumn(row)
    ? columnDef.meta.icons(row.original).map(({ icon, hintDescription, onClick }, index) => (
        <Tooltip
          key={index}
          title={hintDescription && <span dangerouslySetInnerHTML={{ __html: hintDescription }} />}
          placement={'bottom'}
        >
          <IconButton onClick={handleClick(onClick)}>{icon}</IconButton>
        </Tooltip>
      ))
    : null
}

export default IconCell
