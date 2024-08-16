import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import moment from 'moment'

import { PassengerTripBackground, PassengerTripDate } from './style'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import LineLoader from 'components/LineLoader'
import Filter from 'components/Table/components/Filter'
import Table from 'components/Table'
import { getPassengersSelector } from './store/reducers/selectors'
import { getPassengers } from './store/actions'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import { passengersPageFilterOptions } from 'services/filtersOptionsForTables'
import { allPassengersColumns, passengersColumns } from 'components/Table/columns/passengers'
import Button from 'components/Button'
import { generatePdf } from 'services/generatePdf'
import { DATE_FORMAT } from 'constants/dateFormat'
import SubPassengers from './components/SubPassengers'
import { ROLES } from 'constants/roles'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'

const Passengers = () => {
  const { i18n, t } = useTranslation()
  const dispatch = useDispatch()
  const passengers = useSelector(getPassengersSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_PASSENGERS)
  const role = useSelector(getCurrentUserRoleSelector)
  const [tab, setTab] = useState('active')
  const [dataFilter, setDataFilter] = useState(null)

  const activePassengers = useMemo(() => {
    if (tab === 'active') {
      const values = passengers
        .map(passenger => {
          const activeDepartureDates = passenger?.departure_dates?.filter(({ date }) =>
            moment(date).isSameOrAfter(moment(), 'day')
          )
          if (activeDepartureDates?.length) {
            return activeDepartureDates?.map(item => ({
              ...item,
              date: moment(item?.date).format(DATE_FORMAT),
              main_trip_direction: passenger.main_trip_direction
            }))
          }
        })
        .flat(Infinity)
        .filter(item => item)
      return values
    }
  }, [passengers, tab])

  const archivePassengers = useMemo(() => {
    if (tab === 'archived') {
      const values = passengers
        .map(passenger => {
          const activeDepartureDates = passenger?.departure_dates?.filter(({ date }) =>
            moment(date).isBefore(moment())
          )
          if (activeDepartureDates?.length) {
            return activeDepartureDates?.map(item => ({
              ...item,
              date: moment(item?.date).format(DATE_FORMAT),
              main_trip_direction: passenger.main_trip_direction
            }))
          }
        })
        .flat(Infinity)
        .filter(item => item)
      return values
    }
  }, [passengers, tab])

  const allPassengers = useMemo(() => {
    if (tab === 'all') {
      const values = passengers
        .map(passenger => {
          return passenger?.passengers_list?.map(item => ({
            ...item,
            buch: passenger.buch,
            carrier_name: passenger.carrier_name,
            main_trip_direction: passenger.main_trip_direction
          }))
        })
        .flat(Infinity)
        .filter(item => item)
      return values
    }
  }, [passengers, tab])

  const activeFilterObjects = filteredObjects(activePassengers, dataFilter)
  const archiveFilterObjects = filteredObjects(archivePassengers, dataFilter)

  useEffect(() => {
    dispatch(getPassengers(tab === 'all'))
  }, [tab])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <div>
      <h1>{t('sideBar.passengers')}</h1>
      <TabContext value={tab}>
        <TabList onChange={handleTabChange}>
          <Tab label={t('pages.booking.active')} value="active" />
          <Tab label={t('pages.booking.archive')} value="archived" />
          {role === ROLES.DISPATCHER && <Tab label={t('pages.booking.all')} value="all" />}
        </TabList>
        <TabPanel value="active">
          {loading ? (
            <LineLoader />
          ) : (
            tab === 'active' && (
              <>
                {activePassengers?.length ? (
                  <Filter
                    dataFilter={dataFilter}
                    defaultData={activePassengers}
                    filterSelect={passengersPageFilterOptions}
                    setDataFilter={setDataFilter}
                  />
                ) : null}
                {activePassengers?.length ? (
                  dataFilter ? (
                    <PassengerTripBackground id="ticket">
                      <PassengerTripDate>
                        {`${activeFilterObjects[0]?.passengers_list[0]?.departure?.city[i18n.language]} - ${activeFilterObjects[0]?.passengers_list[0]?.arrival?.city[i18n.language]}`}
                        , {activeFilterObjects[0].date}
                      </PassengerTripDate>
                      <Table
                        data={activeFilterObjects[0].passengers_list}
                        columns={passengersColumns()}
                        sortColumn={false}
                        canExpand={() => true}
                        needRowTable
                        renderSubComponent={data => <SubPassengers data={data} />}
                        emptyMessage={t('common.noRecords')}
                      />
                    </PassengerTripBackground>
                  ) : null
                ) : (
                  t('common.noRecords')
                )}
              </>
            )
          )}
        </TabPanel>
        <TabPanel value="archived">
          {loading ? (
            <LineLoader />
          ) : (
            tab === 'archived' && (
              <>
                {archivePassengers?.length ? (
                  <Filter
                    dataFilter={dataFilter}
                    defaultData={archivePassengers}
                    filterSelect={passengersPageFilterOptions}
                    setDataFilter={setDataFilter}
                  />
                ) : null}
                {archivePassengers?.length ? (
                  dataFilter ? (
                    <PassengerTripBackground id="ticket">
                      <PassengerTripDate>
                        {`${archiveFilterObjects[0]?.passengers_list[0]?.departure?.city[i18n.language]} - ${archiveFilterObjects[0]?.passengers_list[0]?.arrival?.city[i18n.language]}`}
                        , {archiveFilterObjects[0].date}
                      </PassengerTripDate>
                      <Table
                        data={archiveFilterObjects[0].passengers_list}
                        columns={passengersColumns()}
                        sortColumn={false}
                        canExpand={() => true}
                        needRowTable
                        renderSubComponent={data => <SubPassengers data={data} />}
                        emptyMessage={t('common.noRecords')}
                      />
                    </PassengerTripBackground>
                  ) : null
                ) : (
                  t('common.noRecords')
                )}
              </>
            )
          )}
        </TabPanel>
        <TabPanel value="all">
          {loading ? (
            <LineLoader />
          ) : (
            tab === 'all' && (
              <Table
                data={allPassengers}
                columns={allPassengersColumns()}
                sortColumn={false}
                emptyMessage={t('common.noRecords')}
              />
            )
          )}
        </TabPanel>
        {dataFilter ? (
          <Button onClick={generatePdf('trip')} style={{ marginTop: '20px' }}>
            Download PDF
          </Button>
        ) : null}
      </TabContext>
    </div>
  )
}

export default Passengers
