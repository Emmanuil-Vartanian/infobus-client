import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { ListItemButtonStyled, ListStyled } from './style'

import { ROUTES } from 'constants/routes'
import { logOutUser } from 'pages/Login/store/actions'
import { sidebarStateToStore } from 'containers/App/store/actions'

const sideBarData = t => [
  { name: ROUTES.BOOKINGS_PAGE, title: t('sideBar.booking'), icon: <CreditCardIcon /> },
  { name: ROUTES.TRIP_SEARCH_PAGE, title: t('sideBar.searchFlights'), icon: <SearchIcon /> },
  { name: ROUTES.LOGIN_PAGE, title: t('sideBar.logOut'), icon: <LogoutIcon /> }
]

const SideBar = ({ open }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleGoToPage = path => () => {
    if (path === ROUTES.LOGIN_PAGE) {
      dispatch(logOutUser())
      if (window.innerWidth <= 750) {
        dispatch(sidebarStateToStore())
      }
    } else {
      navigate(path)
    }
  }

  return (
    <ListStyled>
      {sideBarData(t).map(({ name, title, icon }) => (
        <ListItem key={title} disablePadding sx={{ display: 'block' }}>
          <ListItemButtonStyled
            open={open}
            active={name === pathname}
            onClick={handleGoToPage(name)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText secondary={title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButtonStyled>
        </ListItem>
      ))}
    </ListStyled>
  )
}

export default SideBar
