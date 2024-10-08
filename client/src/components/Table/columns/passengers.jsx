import { DATE_FORMAT } from 'constants/dateFormat'
import i18n from 'i18n/config'
import moment from 'moment'

const countColumn = () => ({
  header: '№',
  meta: {
    widthCell: 20
  },
  cell: ({ row }) => {
    if (!row.getIsExpanded()) {
      row.getToggleExpandedHandler()()
    }
    return row.index + 1
  }
})

const firstAndLastNameColumn = () => ({
  accessorKey: 'first_name',
  header: i18n.t('pages.passenger.username'),
  meta: {
    widthCell: 165
  },
  cell: ({ getValue, row: { original } }) => `${original.last_name} ${getValue()}`
})

const birthDayColumn = () => ({
  accessorKey: 'birth_date',
  header: i18n.t('pages.passenger.birthDay'),
  meta: {
    widthCell: 155
  },
  cell: ({ getValue }) => moment(getValue()).format(DATE_FORMAT)
})

const typColumn = () => ({
  accessorKey: 'salutation',
  header: i18n.t('pages.passenger.typ'),
  meta: {
    widthCell: 60
  },
  cell: ({ getValue }) => (getValue() ? i18n.t(`pages.tripSearch.${getValue()}`) : '-')
})

const emColumn = () => ({
  accessorKey: 'em',
  header: i18n.t('pages.passenger.em'),
  meta: {
    widthCell: 20
  },
  cell: () => '100'
})

const priceColumn = () => ({
  accessorKey: 'price',
  header: i18n.t('pages.passenger.price'),
  meta: {
    widthCell: 15
  },
  cell: ({ getValue }) => getValue() + '€'
})

const bureauColumn = () => ({
  accessorKey: 'bureau',
  header: i18n.t('pages.passenger.bureau'),
  meta: {
    widthCell: 80
  },
  cell: () => ''
})

const busColumn = () => ({
  accessorKey: 'bus',
  header: i18n.t('pages.passenger.bus'),
  meta: {
    widthCell: 110
  },
  cell: () => ''
})

const placeColumn = () => ({
  accessorKey: 'place',
  header: i18n.t('pages.passenger.place'),
  meta: {
    widthCell: 20
  },
  cell: () => '-'
})

const passIDColumn = () => ({
  accessorKey: 'passport_id',
  header: i18n.t('pages.passenger.passID'),
  meta: {
    widthCell: 75
  },
  cell: ({ getValue }) => getValue()
})

const departureColumn = () => ({
  accessorKey: 'departure',
  header: i18n.t('pages.passenger.departure'),
  meta: {
    widthCell: 165
  },
  cell: ({ getValue }) => getValue()?.city[i18n.language]
})

const arrivalColumn = () => ({
  accessorKey: 'arrival',
  header: i18n.t('pages.passenger.arrival'),
  meta: {
    widthCell: 140
  },
  cell: ({ getValue }) => getValue()?.city[i18n.language]
})

const returnDepartureDateColumn = () => ({
  accessorKey: 'departure_reverse',
  header: i18n.t('pages.passenger.returnDepartureDate'),
  meta: {
    widthCell: 180
  },
  cell: ({ getValue }) => (getValue() ? moment(getValue().date).format(DATE_FORMAT) : '-')
})

const lastNameColumn = () => ({
  accessorKey: 'last_name',
  header: i18n.t('pages.passenger.lastName'),
  meta: {
    widthCell: 130
  }
})

const firstNameColumn = () => ({
  accessorKey: 'first_name',
  header: i18n.t('pages.passenger.firstName'),
  meta: {
    widthCell: 130
  }
})

const hinColumn = () => ({
  accessorKey: 'ow_seat_number',
  header: 'hin',
  meta: {
    widthCell: 70
  },
  cell: ({ getValue }) => getValue() || '-'
})

const rukColumn = () => ({
  accessorKey: 'rt_seat_number',
  header: 'ruk',
  meta: {
    widthCell: 70
  },
  cell: ({ getValue }) => getValue() || '-'
})

const buchColumn = () => ({
  accessorKey: 'buch',
  header: 'buch',
  meta: {
    widthCell: 70
  },
  cell: ({ getValue }) => getValue() || '-'
})

const tripColumn = () => ({
  accessorKey: 'main_trip_direction',
  header: i18n.t('pages.passenger.trip'),
  meta: {
    widthCell: 230
  },
  cell: ({ getValue }) =>
    `${getValue().departure.city[i18n.language]} - ${getValue().arrival.city[i18n.language]}`
})

const companyNameColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.tripSearch.companyName'),
  meta: {
    widthCell: 200
  }
})

export const passengersColumns = () => [
  countColumn(),
  firstAndLastNameColumn(),
  birthDayColumn(),
  typColumn(),
  emColumn(),
  priceColumn(),
  bureauColumn(),
  busColumn(),
  placeColumn(),
  passIDColumn(),
  departureColumn(),
  arrivalColumn(),
  returnDepartureDateColumn()
]

export const allPassengersColumns = () => [
  lastNameColumn(),
  firstNameColumn(),
  birthDayColumn(),
  priceColumn(),
  hinColumn(),
  rukColumn(),
  buchColumn(),
  tripColumn(),
  companyNameColumn()
]
