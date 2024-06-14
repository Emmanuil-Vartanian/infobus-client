import { DATE_FORMAT } from 'constants/dateFormat'
import i18n from 'i18n/config'
import moment from 'moment'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import IconCell from '../cells/IconCell'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'

const idColumn = () => ({
  accessorKey: 'booking_number_id',
  header: i18n.t('pages.booking.id'),
  meta: {
    widthCell: 30
  }
})

const createdAtColumn = () => ({
  accessorKey: 'createdAt',
  header: i18n.t('pages.booking.createdAt'),
  meta: {
    widthCell: 180
  },
  cell: ({ getValue }) => moment(getValue()).format(DATE_FORMAT)
})

const departureColumn = () => ({
  accessorKey: 'departure',
  header: i18n.t('pages.booking.departure'),
  meta: {
    widthCell: 200
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const departureDateColumn = () => ({
  accessorKey: 'departure.date',
  header: i18n.t('pages.booking.departureDate'),
  meta: {
    widthCell: 150
  },
  cell: ({ getValue }) => moment(getValue()).format(DATE_FORMAT)
})

const timeColumn = () => ({
  accessorKey: 'departure.time',
  header: i18n.t('pages.booking.time'),
  meta: {
    widthCell: 50
  }
})

const returnDepartureDateColumn = () => ({
  accessorKey: 'departure_reverse.date',
  header: i18n.t('pages.booking.returnDepartureDate'),
  meta: {
    widthCell: 210
  },
  cell: ({ getValue }) => (getValue() ? moment(getValue()).format(DATE_FORMAT) : '-')
})

const arrivalColumn = () => ({
  accessorKey: 'arrival',
  header: i18n.t('pages.booking.arrival'),
  meta: {
    widthCell: 180
  },
  cell: ({ getValue }) => getValue().city[i18n.language]
})

const buchColumn = () => ({
  accessorKey: 'buch',
  header: i18n.t('pages.booking.buch'),
  meta: {
    widthCell: 50
  },
  cell: ({ getValue }) => getValue() || '-'
})

const statusColumn = () => ({
  accessorKey: 'status',
  header: i18n.t('pages.booking.status'),
  meta: {
    widthCell: 50
  },
  cell: ({ getValue }) => {
    const color = { new: 'red', paid: 'green', confirmed: 'blue', canceled: 'black' }
    return (
      <span style={{ color: color[getValue()] }}>
        {i18n.t(`pages.booking.statuses.${getValue()}`)}
      </span>
    )
  }
})

const ticketColumn = () => ({
  accessorKey: 'ticket',
  header: i18n.t('pages.booking.ticket'),
  meta: {
    widthCell: 50,
    showColumn: ({ original }) => original.status === 'paid',
    icons: data => [
      {
        icon: (
          <Link
            to={ROUTES.BOOKING_TICKET.replace(':id', data._id)}
            target={'_blank'}
            style={{ height: '20px', lineHeight: '20px' }}
          >
            <ConfirmationNumberIcon sx={{ color: '#F6C23E', width: '20px', height: '20px' }} />
          </Link>
        )
      }
    ]
  },
  cell: IconCell
})

const carrierColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.booking.carrier'),
  meta: {
    widthCell: 50
  }
})

export const bookingsColumns = () => [
  idColumn(),
  createdAtColumn(),
  departureColumn(),
  departureDateColumn(),
  timeColumn(),
  returnDepartureDateColumn(),
  arrivalColumn(),
  buchColumn(),
  statusColumn(),
  ticketColumn(),
  carrierColumn()
]
