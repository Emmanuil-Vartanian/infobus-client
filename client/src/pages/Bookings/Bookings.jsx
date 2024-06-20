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
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import Filter from 'components/Table/components/Filter'
import { bookingsPageFilterOptions } from 'services/filtersOptionsForTables'
import moment from 'moment'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'
import { ROLES } from 'constants/roles'

const Bookings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const bookings = useSelector(getBookingsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_BOOKINGS)
  const role = useSelector(getCurrentUserRoleSelector)
  const [tab, setTab] = useState('active')
  const [dataFilter, setDataFilter] = useState(null)
  console.log('role', role)
  const isAgencyRole = role === ROLES.AGENCY_MANAGER
  console.log('isAgencyRole', isAgencyRole)
  const newBookings = bookings
    .map(item => moment(item.departure.date).isSameOrAfter(moment(), 'day') && item)
    .filter(item => item)

  const filterObjects = filteredObjects(newBookings, dataFilter)

  useEffect(() => {
    dispatch(getBookings(false))
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
          {loading ? (
            <LineLoader />
          ) : (
            <>
              {newBookings?.length ? (
                <Filter
                  dataFilter={dataFilter}
                  defaultData={newBookings}
                  filterSelect={bookingsPageFilterOptions}
                  setDataFilter={setDataFilter}
                />
              ) : null}
              <Table
                data={filterObjects}
                columns={bookingsColumns(isAgencyRole)}
                emptyMessage={t('common.noRecords')}
              />
            </>
          )}
        </TabPanel>
        <TabPanel value="archived">
          {loading ? (
            <LineLoader />
          ) : (
            <>
              {bookings?.length ? (
                <Filter
                  dataFilter={dataFilter}
                  defaultData={bookings}
                  filterSelect={bookingsPageFilterOptions}
                  setDataFilter={setDataFilter}
                />
              ) : null}
              <Table
                data={[]}
                columns={bookingsColumns(isAgencyRole)}
                emptyMessage={t('common.noRecords')}
              />
            </>
          )}
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default Bookings
