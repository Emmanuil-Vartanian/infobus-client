import { DATE_FORMAT } from 'constants/dateFormat'
import i18n from 'i18n/config'
import moment from 'moment'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import IconCell from '../cells/IconCell'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { STATUSES } from 'constants/bookings'
import { editColumn } from './locations'
import { ROLES } from 'constants/roles'

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
  cell: ({ getValue }) => getValue()?.city[i18n.language]
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
  accessorKey: 'departure_reverse',
  header: i18n.t('pages.booking.returnDepartureDate'),
  meta: {
    widthCell: 210
  },
  cell: ({ getValue }) => {
    const momentDate = moment(getValue()?.date)
    const isValidDate = momentDate?.isValid()
    return getValue()
      ? isValidDate
        ? momentDate.format(DATE_FORMAT)
        : i18n.t('pages.booking.free')
      : '-'
  }
})

const arrivalColumn = () => ({
  accessorKey: 'arrival',
  header: i18n.t('pages.booking.arrival'),
  meta: {
    widthCell: 180
  },
  cell: ({ getValue }) => getValue()?.city[i18n.language]
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
    widthCell: 130
  },
  cell: ({ getValue }) => {
    const color = { new: 'red', paid: 'green', confirmed: 'blue', canceled: 'black' }
    return getValue() ? (
      <span style={{ color: color[getValue()] }}>
        {i18n.t(`pages.booking.statuses.${getValue()}`)}
      </span>
    ) : (
      '-'
    )
  }
})

const paymentColumn = () => ({
  accessorKey: 'payment_place',
  header: i18n.t('pages.booking.payment'),
  meta: {
    widthCell: 50
  },
  cell: ({ getValue }) => (getValue() ? i18n.t(`pages.tripSearch.${getValue()}`) : '-')
})

const checkColumn = () => ({
  accessorKey: 'check',
  header: i18n.t('pages.booking.check'),
  meta: {
    widthCell: 50,
    showColumn: ({ original }) => original.status !== STATUSES.NEW,
    icons: data => [
      {
        icon: (
          <Link
            to={ROUTES.BOOKING_INVOICE.replace(':id', data._id)}
            target={'_blank'}
            style={{ height: '20px', lineHeight: '20px' }}
          >
            <LocalActivityIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />
          </Link>
        )
      }
    ]
  },
  cell: IconCell
})

const ticketColumn = () => ({
  accessorKey: 'ticket',
  header: i18n.t('pages.booking.ticket'),
  meta: {
    widthCell: 50,
    showColumn: ({ original }) => original.status === STATUSES.PAID,
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

export const bookingsColumns = (role, handleEditBooking) => {
  const edit =
    (role === ROLES.DISPATCHER || role === ROLES.CHIEF) && typeof handleEditBooking === 'function'
      ? [editColumn(handleEditBooking)]
      : []

  return [
    idColumn(),
    createdAtColumn(),
    departureColumn(),
    departureDateColumn(),
    timeColumn(),
    returnDepartureDateColumn(),
    arrivalColumn(),
    buchColumn(),
    statusColumn(),
    paymentColumn(),
    checkColumn(),
    ticketColumn(),
    carrierColumn(),
    ...edit
  ]
}
