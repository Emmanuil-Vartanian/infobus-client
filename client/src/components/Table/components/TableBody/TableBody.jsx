import React, { useState } from 'react'
import { TableBody as TableBodyMui } from '@mui/material'
import { flexRender } from '@tanstack/react-table'

import { TableCellBodyContent, TableCellBodyStyled, TableRowStyled } from 'components/Table/style'
import { Fragment } from 'react'

const TableBody = props => {
  const { hoverRow, getRowModel, handleRowClick, renderSubComponent, needRowTable } = props
  const [rowColor, setRowColor] = useState([])

  return (
    <TableBodyMui>
      {getRowModel().rows.map(({ id, original, getVisibleCells, getIsExpanded }) => {
        const rowId = id

        return (
          <Fragment key={rowId}>
            <TableRowStyled onClick={handleRowClick(original)} hoverRow={hoverRow}>
              {getVisibleCells().map(({ id, column, row, getContext }) => {
                const { meta, cell } = column.columnDef
                if (meta?.rowColor && rowColor.length !== getRowModel().rows.length) {
                  setRowColor(prev => [...prev, meta?.rowColor(row) || null])
                }

                return (
                  <TableCellBodyStyled
                    key={id}
                    onClickCell={Object.keys(meta).includes('onClick')}
                    hoverRow={hoverRow}
                    textAlign={
                      Object.keys(meta).includes('textAlign') ? meta.textAlign(row) : 'center'
                    }
                    width={meta.widthCell}
                  >
                    <TableCellBodyContent className="table-cell-body-content">
                      <div>{flexRender(cell, getContext())}</div>
                    </TableCellBodyContent>
                  </TableCellBodyStyled>
                )
              })}
            </TableRowStyled>
            {getIsExpanded() && (
              <tr className="row-expand">
                {needRowTable ? (
                  renderSubComponent(original)
                ) : (
                  <td className="table-expand" colSpan={getVisibleCells().length}>
                    {renderSubComponent(original)}
                  </td>
                )}
              </tr>
            )}
          </Fragment>
        )
      })}
    </TableBodyMui>
  )
}

export default TableBody
