import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { getBookings } from './store/actions'
import { getBookingsSelector } from './store/reducers/selectors'
import Table from 'components/Table'
import { bookingsColumns } from 'components/Table/columns/bookings'
import { EFFECT_LOADING } from 'constants/effectLoading'
import LineLoader from 'components/LineLoader'
import useLoadingEffect from 'services/hooks/useLoadingEffect'

const Bookings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const bookings = useSelector(getBookingsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_BOOKINGS)
  const [tab, setTab] = useState('active')

  useEffect(() => {
    dispatch(getBookings(tab === 'archived'))
  }, [tab])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <div>
      <h1>{t('sideBar.booking')}</h1>
      <TabContext value={tab}>
        <TabList onChange={handleTabChange}>
          <Tab label={t('pages.booking.active')} value="active" />
          <Tab label={t('pages.booking.archive')} value="archived" />
        </TabList>
        <TabPanel value="active">
          {loading ? <LineLoader /> : <Table data={bookings} columns={bookingsColumns()} />}
        </TabPanel>
        <TabPanel value="archived">
          {loading ? <LineLoader /> : <Table data={bookings} columns={bookingsColumns()} />}
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default Bookings
