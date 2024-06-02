import React from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import TableHead from '@mui/material/TableHead'
import { flexRender } from '@tanstack/react-table'
import TableRow from '@mui/material/TableRow'

import { TableCellHeaderContent, TableCellHeaderStyled } from 'components/Table/style'

const TableHeader = props => {
  const { getHeaderGroups, sortColumn } = props

  return (
    <TableHead className="table-header">
      {getHeaderGroups()?.map(({ id, headers }) => (
        <TableRow key={id}>
          {headers.map(({ id, column, getContext }) => {
            const { header } = column.columnDef

            return (
              <TableCellHeaderStyled
                key={id}
                onClick={sortColumn ? column.getToggleSortingHandler() : undefined}
              >
                <TableCellHeaderContent className="table-cell-header-content">
                  {flexRender(header, getContext())}

                  {typeof header === 'string' && sortColumn
                    ? {
                        asc: <ArrowRightAltIcon sx={{ transform: 'rotate(90deg)' }} />,
                        desc: <ArrowRightAltIcon sx={{ transform: 'rotate(-90deg)' }} />,
                        false: <ImportExportIcon />
                      }[column.getIsSorted()] ?? null
                    : null}
                </TableCellHeaderContent>
              </TableCellHeaderStyled>
            )
          })}
        </TableRow>
      ))}
    </TableHead>
  )
}

export default TableHeader
