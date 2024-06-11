import CreditCardIcon from '@mui/icons-material/CreditCard'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import RouteIcon from '@mui/icons-material/Route'
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

  const userSideBar = [bookingsSideBar, tripSearchSideBar]

  const agencySideBar = [
    bookingsSideBar,
    { name: ROUTES.TRIPS_PAGE, title: t('sideBar.trips'), icon: <RouteIcon /> },
    tripSearchSideBar
  ]

  const sideBarData = () => {
    const user = userRole === ROLES.USER ? userSideBar : []
    const agency = userRole === ROLES.AGENCY_MANAGER ? agencySideBar : []

    return [
      ...user,
      ...agency,
      { name: ROUTES.LOGIN_PAGE, title: t('sideBar.logOut'), icon: <LogoutIcon /> }
    ]
  }

  return { sideBarData: sideBarData() }
}

export default useSideBarData
