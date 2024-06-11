import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { ListItemButtonStyled, ListStyled } from './style'

import { ROUTES } from 'constants/routes'
import { logOutUser } from 'pages/Login/store/actions'
import { sidebarStateToStore } from 'containers/App/store/actions'
import useSideBarData from './hooks/useSideBarData'

const SideBar = ({ open }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { sideBarData } = useSideBarData()

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
  )
}

export default SideBar
