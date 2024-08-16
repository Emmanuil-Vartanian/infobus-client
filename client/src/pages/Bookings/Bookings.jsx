import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import moment from 'moment'

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
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'
import Popup from 'components/Popup'
import EditBookingForm from './components/EditBookingForm/EditBookingForm'
import { ROLES } from 'constants/roles'

const Bookings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const bookings = useSelector(getBookingsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_BOOKINGS)
  const role = useSelector(getCurrentUserRoleSelector)
  const [tab, setTab] = useState('active')
  const [dataFilter, setDataFilter] = useState(null)
  const [bookingData, setBookingData] = useState({ show: false, data: null })

  const activeBookings = useMemo(() => {
    if (tab === 'active') {
      return bookings
        .map(item => {
          const departureDate = moment(item.departure.date).isSameOrAfter(moment(), 'day')
          const departureReverseDate =
            item.departure_reverse?.date === 'free' ||
            moment(item.departure_reverse?.date).isSameOrAfter(moment(), 'day')
          if (item.departure_reverse) {
            return (departureDate || departureReverseDate) && item
          } else {
            return departureDate && item
          }
        })
        .filter(item => item)
    }
  }, [tab, bookings])

  const archivedBookings = useMemo(() => {
    if (tab === 'archived') {
      return bookings
        .map(item => {
          const departureDate = moment(item.departure.date).isBefore(moment(), 'day')
          const departureReverseDate = moment(item.departure_reverse?.date).isBefore(
            moment(),
            'day'
          )
          if (item.departure_reverse) {
            return departureDate && departureReverseDate && item
          } else {
            return departureDate && item
          }
        })
        .filter(item => item)
    }
  }, [tab, bookings])

  const activeFilterObjects = filteredObjects(activeBookings, dataFilter)
  const archivedFilterObjects = filteredObjects(archivedBookings, dataFilter)

  useEffect(() => {
    dispatch(getBookings(false))
  }, [tab])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleEditBooking = data => {
    setBookingData({ show: true, data })
  }

  const handleClearBookingData = () => {
    setBookingData({ show: false, data: null })
  }

  return (
    <div>
      <h1>{t('sideBar.booking')}</h1>
      <TabContext value={tab}>
        <TabList onChange={handleTabChange}>
          <Tab label={t('pages.booking.active')} value="active" />
          <Tab label={t('pages.booking.archive')} value="archived" />
          {role === ROLES.DISPATCHER && (
            <Tab label={t('pages.booking.customer')} value="customer" />
          )}
        </TabList>
        <TabPanel value="active">
          {loading ? (
            <LineLoader />
          ) : (
            <>
              {activeBookings?.length ? (
                <Filter
                  dataFilter={dataFilter}
                  defaultData={activeBookings}
                  filterSelect={bookingsPageFilterOptions}
                  setDataFilter={setDataFilter}
                />
              ) : null}
              <Table
                data={activeFilterObjects}
                columns={bookingsColumns(role, handleEditBooking)}
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
              {archivedBookings?.length ? (
                <Filter
                  dataFilter={dataFilter}
                  defaultData={archivedBookings}
                  filterSelect={bookingsPageFilterOptions}
                  setDataFilter={setDataFilter}
                />
              ) : null}
              <Table
                data={archivedFilterObjects}
                columns={bookingsColumns(role)}
                emptyMessage={t('common.noRecords')}
              />
            </>
          )}
        </TabPanel>
        <TabPanel value="customer">
          {loading ? (
            <LineLoader />
          ) : (
            <Table data={[]} columns={bookingsColumns(role)} emptyMessage={t('common.noRecords')} />
          )}
        </TabPanel>
      </TabContext>
      {bookingData.show && (
        <Popup
          content={
            <EditBookingForm booking={bookingData.data} handleCloseModal={handleClearBookingData} />
          }
          open={bookingData.show}
          onClose={handleClearBookingData}
          title={t('common.edit')}
          maxWidthStyle={200}
        />
      )}
    </div>
  )
}

export default Bookings
