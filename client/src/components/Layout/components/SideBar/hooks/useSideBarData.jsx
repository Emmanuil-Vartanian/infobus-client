import CreditCardIcon from '@mui/icons-material/CreditCard'
import SearchIcon from '@mui/icons-material/Search'
import RouteIcon from '@mui/icons-material/Route'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { ROUTES } from 'constants/routes'
import { ROLES } from 'constants/roles'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'

const useSideBarData = () => {
  const { t } = useTranslation()
  const userRole = useSelector(getCurrentUserRoleSelector)

  const bookingsSideBar = {
    name: ROUTES.BOOKINGS_PAGE,
    title: t('sideBar.booking'),
    icon: <CreditCardIcon />
  }

  const tripSearchSideBar = {
    name: ROUTES.TRIP_SEARCH_PAGE,
    title: t('sideBar.searchFlights'),
    icon: <SearchIcon />
  }

  const passengersSideBar = {
    name: ROUTES.PASSENGERS_PAGE,
    title: t('sideBar.passengers'),
    icon: <PeopleAltIcon />
  }

  const tripsSideBar = { name: ROUTES.TRIPS_PAGE, title: t('sideBar.trips'), icon: <RouteIcon /> }

  const userSideBar = [bookingsSideBar, tripSearchSideBar]

  const agencySideBar = [bookingsSideBar, tripsSideBar, tripSearchSideBar]

  const carrierSideBar = [bookingsSideBar, passengersSideBar, tripSearchSideBar]

  const dispatcherSideBar = [
    bookingsSideBar,
    passengersSideBar,
    tripsSideBar,
    { name: ROUTES.LOCATIONS_PAGE, title: t('sideBar.locations'), icon: <LocationOnIcon /> },
    tripSearchSideBar
  ]

  const sideBarData = () => {
    const user = userRole === ROLES.USER ? userSideBar : []
    const agency = userRole === ROLES.AGENCY_MANAGER ? agencySideBar : []
    const carrier = userRole === ROLES.CARRIER_MANAGER ? carrierSideBar : []
    const dispatcher = userRole === ROLES.DISPATCHER ? dispatcherSideBar : []

    return [...user, ...agency, ...carrier, ...dispatcher]
  }

  return { sideBarData: sideBarData() }
}

export default useSideBarData
