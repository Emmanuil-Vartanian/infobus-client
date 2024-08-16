import i18n from 'i18n/config'
import IconCell from '../cells/IconCell'
import DeleteIcon from '@mui/icons-material/Delete'

const idColumn = () => ({
  accessorKey: 'route_number_id',
  header: i18n.t('pages.routes.id'),
  meta: {
    widthCell: 70
  }
})

const idRevColumn = () => ({
  accessorKey: 'reverse_route_number_id',
  header: 'id rev',
  meta: {
    widthCell: 100
  }
})

const routeColumn = () => ({
  accessorKey: 'points',
  header: i18n.t('pages.routes.route'),
  meta: {
    widthCell: 550
  },
  cell: ({ getValue }) => {
    const route = getValue().map(({ city }) => city[i18n.language])
    return route.join(' - ')
  }
})

export const editColumn = openDelete => ({
  accessorKey: ' ',
  meta: {
    widthCell: 70,
    showColumn: () => true,
    icons: () => [
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: openDelete
      }
    ]
  },
  cell: IconCell
})

export const routesColumns = openDelete => [
  idColumn(),
  idRevColumn(),
  routeColumn(),
  editColumn(openDelete)
]
