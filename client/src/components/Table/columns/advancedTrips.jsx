import i18n from 'i18n/config'
import EditIcon from '@mui/icons-material/Edit'
import IconCell from '../cells/IconCell'
import DeleteIcon from '@mui/icons-material/Delete'

const idColumn = (isDirection = false) => ({
  accessorKey: isDirection ? 'direction_number_id' : 'trip_number_id',
  header: i18n.t('pages.booking.id'),
  meta: {
    widthCell: 20
  }
})

const cityDepartureColumn = () => ({
  accessorKey: 'departure',
  header: i18n.t('pages.tripSearch.departure'),
  meta: {
    widthCell: 200
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const departureDaysColumn = () => ({
  accessorKey: 'departureDays',
  header: i18n.t('pages.tripSearch.departureDays'),
  meta: {
    widthCell: 150
  },
  cell: ({ row }) => {
    const days = row.original.departure.days_of_week?.map(item => i18n.t(`days.${item}`))
    return days?.join(', ')
  }
})

const timeColumn = () => ({
  accessorKey: 'departureTime',
  header: i18n.t('pages.tripSearch.time'),
  meta: {
    widthCell: 120
  },
  cell: ({ row }) => {
    return row.original.departure.time + '-' + row.original.arrival.time
  }
})

const arrivalDaysColumn = () => ({
  accessorKey: 'arrivalDays',
  header: i18n.t('pages.tripSearch.arrivalDays'),
  meta: {
    widthCell: 160
  },
  cell: ({ row }) => {
    const days = row.original.arrival.days_of_week?.map(item => i18n.t(`days.${item}`))
    return days?.join(', ')
  }
})

const cityArrivalColumn = () => ({
  accessorKey: 'arrival',
  header: i18n.t('pages.tripSearch.arrival'),
  meta: {
    widthCell: 200
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const owColumn = () => ({
  accessorKey: 'prices.ow_price',
  header: 'ow',
  meta: {
    widthCell: 70
  },
  cell: ({ getValue }) => getValue() || '-'
})

const rtColumn = () => ({
  accessorKey: 'prices.rt_price',
  header: 'rt',
  meta: {
    widthCell: 70
  },
  cell: ({ getValue }) => getValue() || '-'
})

const companyNameColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.tripSearch.companyName'),
  meta: {
    widthCell: 200
  }
})

const groupColumn = () => ({
  accessorKey: 'consolidator_name',
  header: i18n.t('pages.trip.group'),
  meta: {
    widthCell: 230
  },
  cell: ({ getValue }) => getValue() || '-'
})

const statusColumn = () => ({
  accessorKey: 'active',
  header: i18n.t('pages.trip.status'),
  meta: {
    widthCell: 150
  },
  cell: ({ getValue }) => {
    return (
      <span style={{ color: getValue() ? 'green' : 'red' }}>
        {getValue() ? i18n.t('common.active') : i18n.t('common.notActive')}
      </span>
    )
  }
})

const editColumn = (editTrip, deleteTrip) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editTrip
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: deleteTrip
      }
    ]
  },
  cell: IconCell
})

export const advancedTripsColumns = (isDirection, editTrip, deleteTrip) => [
  idColumn(isDirection),
  cityDepartureColumn(),
  departureDaysColumn(),
  timeColumn(),
  arrivalDaysColumn(),
  cityArrivalColumn(),
  owColumn(),
  rtColumn(),
  companyNameColumn(),
  groupColumn(),
  statusColumn(),
  editColumn(editTrip, deleteTrip)
]
