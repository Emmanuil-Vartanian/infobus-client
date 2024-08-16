import i18n from 'i18n/config'
import IconCell from '../cells/IconCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const idColumn = () => ({
  accessorKey: 'baggage_number_id',
  header: i18n.t('pages.baggage.id'),
  meta: {
    widthCell: 70
  }
})

const nameColumn = () => ({
  accessorKey: 'name',
  header: i18n.t('pages.baggage.name'),
  meta: {
    widthCell: 250
  },
  cell: ({ getValue }) => {
    return getValue()[i18n.language]
  }
})

const typeColumn = () => ({
  accessorKey: 'type',
  header: i18n.t('pages.baggage.type'),
  meta: {
    widthCell: 200
  },
  cell: ({ getValue }) => i18n.t(`pages.baggage.${getValue()}`)
})

const valueColumn = () => ({
  accessorKey: 'value',
  header: i18n.t('pages.baggage.value'),
  meta: {
    widthCell: 180
  }
})

const unitsColumn = () => ({
  accessorKey: 'units',
  header: i18n.t('pages.baggage.units'),
  meta: {
    widthCell: 210
  }
})

export const editColumn = (editBaggage, openDelete) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editBaggage
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: openDelete
      }
    ]
  },
  cell: IconCell
})

export const baggageColumns = (editBaggage, openDelete) => [
  idColumn(),
  nameColumn(),
  typeColumn(),
  valueColumn(),
  unitsColumn(),
  editColumn(editBaggage, openDelete)
]
