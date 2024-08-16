import i18n from 'i18n/config'
import IconCell from '../cells/IconCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const idColumn = () => ({
  accessorKey: 'discount_number_id',
  header: i18n.t('pages.discounts.id'),
  meta: {
    widthCell: 70
  }
})

const discountNameColumn = () => ({
  accessorKey: 'name',
  header: i18n.t('pages.discounts.discountName'),
  meta: {
    widthCell: 250
  },
  cell: ({ getValue }) => {
    return getValue()[i18n.language]
  }
})

const discountTypeColumn = () => ({
  accessorKey: 'type',
  header: i18n.t('pages.discounts.discountType'),
  meta: {
    widthCell: 150
  },
  cell: ({ getValue }) => {
    return i18n.t(`pages.discounts.${getValue()}`)
  }
})

const discountSizeColumn = () => ({
  accessorKey: 'value',
  header: i18n.t('pages.discounts.discountSize'),
  meta: {
    widthCell: 150
  }
})

const discountCurrencyColumn = () => ({
  accessorKey: 'currency',
  header: i18n.t('pages.discounts.currency'),
  meta: {
    widthCell: 70
  }
})

export const editColumn = (editDiscount, openDelete) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editDiscount
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: openDelete
      }
    ]
  },
  cell: IconCell
})

export const discountsColumns = (editDiscount, openDelete) => [
  idColumn(),
  discountNameColumn(),
  discountTypeColumn(),
  discountSizeColumn(),
  discountCurrencyColumn(),
  editColumn(editDiscount, openDelete)
]
