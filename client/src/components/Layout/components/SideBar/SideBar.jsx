import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout'
import { useTranslation } from 'react-i18next'

import { ListItemButtonStyled, ListStyled, SideBarContainer } from './style'

import { logOutUser } from 'pages/Login/store/actions'
import { sidebarStateToStore } from 'containers/App/store/actions'
import useSideBarData from './hooks/useSideBarData'
import { ROUTES } from 'constants/routes'

const SideBar = ({ open }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { sideBarData } = useSideBarData()

  const handleGoToPage = path => () => {
    navigate(path)
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate(ROUTES.LOGIN_PAGE)
    if (window.innerWidth <= 750) {
      dispatch(sidebarStateToStore())
    }
  }

  return (
    <SideBarContainer>
      <ListStyled>
        {sideBarData.map(({ name, title, icon }) => (
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
      <ListStyled>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButtonStyled open={open} onClick={handleLogout}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText secondary={t('sideBar.logOut')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButtonStyled>
        </ListItem>
      </ListStyled>
    </SideBarContainer>
  )
}

export default SideBar
