import CreditCardIcon from '@mui/icons-material/CreditCard'
import SearchIcon from '@mui/icons-material/Search'
import RouteIcon from '@mui/icons-material/Route'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import MapIcon from '@mui/icons-material/Map'
import PercentIcon from '@mui/icons-material/Percent'
import LuggageIcon from '@mui/icons-material/Luggage'

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

  const locationsSideBar = {
    name: ROUTES.LOCATIONS_PAGE,
    title: t('sideBar.locations'),
    icon: <LocationOnIcon />
  }

  const agenciesSideBar = {
    name: ROUTES.AGENCIES_PAGE,
    title: t('sideBar.agencies'),
    icon: <CorporateFareIcon />
  }

  const usersSideBar = {
    name: ROUTES.USERS_PAGE,
    title: t('sideBar.users'),
    icon: <PeopleAltIcon />
  }

  const routesSideBar = {
    name: ROUTES.ROUTES_PAGE,
    title: t('sideBar.routes'),
    icon: <MapIcon />
  }

  const discountSideBar = {
    name: ROUTES.DISCOUNTS_PAGE,
    title: t('sideBar.discounts'),
    icon: <PercentIcon />
  }

  const baggageSideBar = {
    name: ROUTES.BAGGAGE_PAGE,
    title: t('sideBar.baggage'),
    icon: <LuggageIcon />
  }

  const userSideBar = [bookingsSideBar, tripSearchSideBar]

  const agencySideBar = [bookingsSideBar, tripsSideBar, tripSearchSideBar]

  const carrierSideBar = [bookingsSideBar, passengersSideBar, tripSearchSideBar]

  const dispatcherSideBar = [
    bookingsSideBar,
    passengersSideBar,
    tripsSideBar,
    locationsSideBar,
    tripSearchSideBar
  ]

  const chiefSideBar = [
    bookingsSideBar,
    passengersSideBar,
    tripsSideBar,
    agenciesSideBar,
    usersSideBar,
    locationsSideBar,
    routesSideBar,
    discountSideBar,
    baggageSideBar,
    tripSearchSideBar
  ]

  const sideBarData = () => {
    const user = userRole === ROLES.USER ? userSideBar : []
    const agency = userRole === ROLES.AGENCY_MANAGER ? agencySideBar : []
    const carrier = userRole === ROLES.CARRIER_MANAGER ? carrierSideBar : []
    const dispatcher = userRole === ROLES.DISPATCHER ? dispatcherSideBar : []
    const chief = userRole === ROLES.CHIEF ? chiefSideBar : []

    return [...user, ...agency, ...carrier, ...dispatcher, ...chief]
  }

  return { sideBarData: sideBarData() }
}

export default useSideBarData
