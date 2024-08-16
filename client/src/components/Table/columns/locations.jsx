import i18n from 'i18n/config'
import IconCell from '../cells/IconCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const idColumn = () => ({
  accessorKey: 'location_number_id',
  header: i18n.t('pages.locations.id'),
  meta: {
    widthCell: 70
  }
})

const countryColumn = () => ({
  accessorKey: 'country',
  header: i18n.t('pages.locations.country'),
  meta: {
    widthCell: 140
  },
  cell: ({ getValue }) => getValue()[i18n.language]
})

const cityColumn = () => ({
  accessorKey: 'city',
  header: i18n.t('pages.locations.city'),
  meta: {
    widthCell: 170
  },
  cell: ({ getValue }) => getValue()[i18n.language]
})

const addressColumn = () => ({
  accessorKey: 'address',
  header: i18n.t('pages.locations.address'),
  meta: {
    widthCell: 400
  },
  cell: ({ getValue }) => getValue()[i18n.language]
})

const nameColumn = () => ({
  accessorKey: 'name',
  header: i18n.t('pages.locations.name'),
  meta: {
    widthCell: 200
  },
  cell: ({ getValue }) => getValue()[i18n.language]
})

const editColumn = (editLocation, openDelete) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editLocation
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: openDelete
      }
    ]
  },
  cell: IconCell
})

export const locationsColumns = (editLocation, openDelete) => {
  return [
    idColumn(),
    countryColumn(),
    cityColumn(),
    addressColumn(),
    nameColumn(),
    editColumn(editLocation, openDelete)
  ]
}
