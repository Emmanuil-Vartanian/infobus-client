import React from 'react'
import { useNavigate } from 'react-router'
import CloseIcon from '@mui/icons-material/Close'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Logo } from 'components/AuthHeader/style'
import { HeaderBlock, TodayBlock, UserData } from './style'

import { ROUTES } from 'constants/routes'
import { FULL_DAY_DATE_FORMAT } from 'constants/dateFormat'
import LanguageSwitch from 'containers/LanguageSwitch'
import { getCurrentUserSelector } from 'pages/Login/store/reducers/selectors'

const Header = ({ open, handleDrawerOpen }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useSelector(getCurrentUserSelector)

  const handleGoToHome = () => {
    navigate(ROUTES.BOOKINGS_PAGE)
  }

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ marginRight: 5 }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Logo onClick={handleGoToHome}>Avtobus</Logo>
      <HeaderBlock>
        <TodayBlock>
          {t('common.today')}: {moment().format(FULL_DAY_DATE_FORMAT)}
        </TodayBlock>
        <UserData>
          <div>
            {t('common.hi')}, {user.name}! [{user.role}]
          </div>
          <LanguageSwitch />
        </UserData>
      </HeaderBlock>
    </Toolbar>
  )
}

export default Header
