import React from 'react'
import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel as filteredRowModel,
  getExpandedRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import { MaUTableStyle, TableCellBodyError, TableContainer } from './style'

const Table = ({
  data,
  columns,
  handleClickRow,
  emptyMessage,
  canExpand,
  renderSubComponent,
  needRowTable = false,
  sortColumn = true
}) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: filteredRowModel(),
    getRowCanExpand: canExpand,
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const handleOnClickRow = data => () => {
    if (typeof handleClickRow === 'function') {
      handleClickRow(data)
    }
  }

  return (
    <TableContainer>
      <div>
        <MaUTableStyle>
          <TableHeader getHeaderGroups={getHeaderGroups} sortColumn={sortColumn} />
          <TableBody
            hoverRow={typeof handleClickRow === 'function'}
            getRowModel={getRowModel}
            handleRowClick={handleOnClickRow}
            renderSubComponent={renderSubComponent}
            needRowTable={needRowTable}
          />
        </MaUTableStyle>
      </div>
      {emptyMessage && !data.length && (
        <TableCellBodyError>
          <div className="empty-message">{emptyMessage}</div>
        </TableCellBodyError>
      )}
    </TableContainer>
  )
}

export default Table
