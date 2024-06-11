import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconCell from '../cells/IconCell'
import i18n from 'i18n/config'
import ButtonCell from '../cells/ButtonCell'

const fullInfoColumn = () => ({
  accessorKey: ' ',
  meta: {
    widthCell: 50,
    showColumn: () => true,
    icons: () => [
      {
        icon: <InfoOutlinedIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: (data, row) => row.getToggleExpandedHandler()()
      }
    ]
  },
  cell: IconCell
})

const cityDepartureColumn = () => ({
  accessorKey: 'departure',
  header: i18n.t('pages.tripSearch.departure'),
  meta: {
    widthCell: 170
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const departureDaysColumn = () => ({
  accessorKey: 'departureDays',
  header: i18n.t('pages.tripSearch.departureDays'),
  meta: {
    widthCell: 110
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
    widthCell: 110
  },
  cell: ({ row }) => {
    return row.original.departure.time + '-' + row.original.arrival.time
  }
})

const arrivalDaysColumn = () => ({
  accessorKey: 'arrivalDays',
  header: i18n.t('pages.tripSearch.arrivalDays'),
  meta: {
    widthCell: 130
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
    widthCell: 150
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const oneWayTicketColumn = handleGetTicket => ({
  accessorKey: 'oneWayTicket',
  header: i18n.t('pages.tripSearch.oneWayTicket'),
  meta: {
    widthCell: 220,
    buttonTitle: ({ prices }) => ({
      value: prices.ow_price,
      title: `<b>${prices.ow_price}€</b> ${i18n.t('pages.tripSearch.toBook')}`
    }),
    buttonClick: handleGetTicket
  },
  cell: ButtonCell
})

const roundTripTicketColumn = handleGetTicket => ({
  accessorKey: 'roundTripTicket',
  header: i18n.t('pages.tripSearch.roundTripTicket'),
  meta: {
    widthCell: 220,
    buttonTitle: ({ prices }) => ({
      value: prices.rt_price,
      title: `<b>${prices.rt_price}€</b> ${i18n.t('pages.tripSearch.toBook')}`
    }),
    buttonClick: handleGetTicket
  },
  cell: ButtonCell
})

const companyNameColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.tripSearch.companyName'),
  meta: {
    widthCell: 180
  }
})

export const tripsSearchColumns = (handleGetTicket, handleGetReverseTicket) => [
  fullInfoColumn(),
  cityDepartureColumn(),
  departureDaysColumn(),
  timeColumn(),
  arrivalDaysColumn(),
  cityArrivalColumn(),
  oneWayTicketColumn(handleGetTicket),
  roundTripTicketColumn(handleGetReverseTicket),
  companyNameColumn()
]
