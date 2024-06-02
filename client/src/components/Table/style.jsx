import { styled } from '@mui/system'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import MaUTable from '@mui/material/Table'
import { styledCustomProps } from 'services/styledCustomProps'

export const TableContainer = styled('div')`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  > div {
    overflow-x: auto;
    overflow-y: hidden;
  }
`

export const MaUTableStyle = styled(MaUTable)`
  min-width: max-content;
  .MuiTableCell-root {
    padding: 4px 0px;
    font-size: 13px;
    :not(:first-of-type) > .table-cell-header-content,
    :not(:first-of-type) > .table-cell-body-content {
      border-left: 1px solid #c1c1c1;
    }
    > .table-cell-header-content,
    > .table-cell-body-content {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .table-expand {
    padding: 10px 20px;
    background-color: #ededed;
  }
`

export const TableRowStyled = styled(
  TableRow,
  styledCustomProps
)(
  ({ hoverRow }) => `
  background: #f8f8f8;
  .MuiTableCell-root {
    border-bottom: none;
  }
  :not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
  :nth-of-type(2n) {
    background: #f4f4f4;
  }
  :last-child {
    border-bottom-left-radius: 8px;
  }
  :hover {
    cursor: ${hoverRow ? 'pointer' : 'auto'};
    background: ${hoverRow ? '#e0e0e0' : ''};
  }
`
)

export const TableCellHeaderStyled = styled(
  TableCell,
  styledCustomProps
)(
  ({ textAlign }) => `
  background: #f4f4f4;
  color: grey;
  cursor: pointer;
  :first-of-type {
    border-top-left-radius: 8px;
  }
  :last-child {
    border-top-right-radius: 8px;
  }
  > .table-cell-header-content {
    justify-content: ${textAlign} !important;
    text-align: ${textAlign} !important;
  }
`
)

export const TableCellHeaderContent = styled('div')`
  height: 28px;
  padding: 0px 12px;
  > svg {
    margin: 0px 4px 0px 8px;
    color: #63060a;
    width: 20px;
  }
`

export const TableCellBodyStyled = styled(
  TableCell,
  styledCustomProps
)(
  ({ onClickCell, hoverRow, textAlign, width }) => `
  display: table-cell;
  color: grey;
  font-weight: 500;
  max-width: ${width}px;
  width: ${width}px;
  :first-of-type {
    border-bottom-left-radius: 8px;
  }
  :last-child {
    border-bottom-right-radius: 8px;
  }
  :hover {
    cursor: ${onClickCell || hoverRow ? 'pointer' : 'auto'};
    background-color: ${onClickCell ? '#c1c1c1' : 'inherit'};
  }
  > .table-cell-body-content {
    justify-content: ${textAlign} !important;
    text-align: ${textAlign} !important;
  }
`
)

export const TableCellBodyContent = styled('div')`
  height: 28px;
  padding: 0px 16px;
  > .MuiIconButton-root {
    padding: 6px;
  }
`

export const TableCellBodyError = styled('div')`
  color: grey;
  text-align: center;
  letter-spacing: 0.15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding: 32px;
  background: #f4f4f4;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  > .empty-message {
    margin: 0 auto;
    white-space: pre-wrap;
  }
`
