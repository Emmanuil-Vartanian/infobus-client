import { DATE_FORMAT } from 'constants/dateFormat'
import i18n from 'i18n/config'
import moment from 'moment'

const idColumn = () => ({
  accessorKey: 'trip_number_id',
  header: i18n.t('pages.booking.id'),
  meta: {
    widthCell: 20
  }
})

const departureDateColumn = () => ({
  accessorKey: 'departure.date_list',
  header: i18n.t('pages.booking.departureDate'),
  meta: {
    widthCell: 150
  },
  sortingFn: (rowA, rowB, columnId) => {
    const datesOptions = row => {
      return row?.filter(date => {
        return moment(date).isSame(moment(), 'day') || moment(date).isAfter(moment())
      })
    }
    const valueA = datesOptions(rowA.getValue(columnId))
    const valueB = datesOptions(rowB.getValue(columnId))

    return valueA > valueB ? 1 : -1
  },
  cell: ({ getValue }) => {
    const datesOptions = getValue()?.filter(date => {
      return moment(date).isSame(moment(), 'day') || moment(date).isAfter(moment())
    })
    return moment(datesOptions[0]).format(DATE_FORMAT)
  }
})

const companyNameColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.tripSearch.companyName'),
  meta: {
    widthCell: 200
  }
})

const routeColumn = () => ({
  accessorKey: 'points',
  header: i18n.t('pages.tripSearch.route'),
  meta: {
    widthCell: 650
  },
  sortingFn: (rowA, rowB, columnId) => {
    const routes = values => {
      return values.map(({ city, time }) => {
        return `${city[i18n.language]} - ${time}`
      })
    }
    const valueA = routes(rowA.getValue(columnId))
    const valueB = routes(rowB.getValue(columnId))

    return valueA > valueB ? 1 : -1
  },
  cell: ({ getValue }) => {
    const routes = getValue().map(({ city, time }) => {
      return `${city[i18n.language]} - ${time}`
    })
    return routes.join(', ')
  }
})

const licensePlateColumn = () => ({
  accessorKey: 'transport.license_plate',
  header: i18n.t('pages.trip.licensePlate'),
  meta: {
    widthCell: 170
  }
})

const colorColumn = () => ({
  accessorKey: 'transport.color',
  header: i18n.t('pages.trip.color'),
  meta: {
    widthCell: 30
  },
  cell: ({ getValue }) => getValue()[i18n.language] || '-'
})

const phoneColumn = () => ({
  accessorKey: 'transport.phone',
  header: i18n.t('pages.trip.phone'),
  meta: {
    widthCell: 150
  }
})

export const tripsColumns = () => [
  idColumn(),
  departureDateColumn(),
  companyNameColumn(),
  routeColumn(),
  licensePlateColumn(),
  colorColumn(),
  phoneColumn()
]
