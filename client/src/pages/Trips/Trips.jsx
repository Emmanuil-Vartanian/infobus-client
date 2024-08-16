import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import LineLoader from 'components/LineLoader'
import Table from 'components/Table'
import { tripsColumns } from 'components/Table/columns/trips'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { deleteTrip, getTrips } from './store/actions'
import { getTripsSelector } from './store/reducers/selectors'
import Filter from 'components/Table/components/Filter'
import {
  advancedTripsPageFilterOptions,
  tripsPageFilterOptions
} from 'services/filtersOptionsForTables'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'
import { ROLES } from 'constants/roles'
import { advancedTripsColumns } from 'components/Table/columns/advancedTrips'
import { getDirections } from 'pages/TripSearch/store/actions'
import { getDirectionsSelector } from 'pages/TripSearch/store/reducers/selectors'
import { TitleBlock } from 'pages/Locations/style'
import Button from 'components/Button'
import Popup from 'components/Popup'
import CreateTrip from './components/CreateTrip'
import UpdateTrip from './components/UpdateTrip'
import DeleteModal from 'components/Popup/components'

const Trips = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const trips = useSelector(getTripsSelector)
  const directions = useSelector(getDirectionsSelector)
  const loadingTrips = useLoadingEffect(EFFECT_LOADING.GET_TRIPS)
  const loadingDirections = useLoadingEffect(EFFECT_LOADING.GET_DIRECTIONS)
  const role = useSelector(getCurrentUserRoleSelector)
  const [dataFilter, setDataFilter] = useState(null)
  const [tab, setTab] = useState('all')
  const [createTrip, setCreateTrip] = useState(false)
  const [updateTrip, setUpdateTrip] = useState(null)
  const [deleteTripData, setDeleteTripData] = useState({ show: false, data: null })

  const advancedTrips = role === ROLES.CHIEF

  const filterTrips = filteredObjects(trips, dataFilter)
  const filterDirections = filteredObjects(directions, dataFilter)

  useEffect(() => {
    if (tab === 'all') {
      if (!trips?.length) {
        dispatch(getTrips())
      }
    } else {
      if (!directions?.length) {
        dispatch(getDirections())
      }
    }
  }, [tab, advancedTrips])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleCloseTrip = () => {
    setCreateTrip(false)
    setUpdateTrip(null)
  }

  const handleOpenUpdateTrip = data => {
    setUpdateTrip(data)
  }

  const handleOpenAddTrip = () => {
    setCreateTrip(true)
  }

  const handleDelete = () => {
    dispatch(deleteTrip(deleteTripData.data._id, handleClearDeleteTrip))
  }

  const handleOpenDeleteTrip = data => {
    setDeleteTripData({ show: true, data })
  }

  const handleClearDeleteTrip = () => {
    setDeleteTripData({ show: false, data: null })
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.trips')}</h1>
        <Button size={'small'} variant="outlined" onClick={handleOpenAddTrip}>
          {t('common.add')}
        </Button>
      </TitleBlock>
      {advancedTrips ? (
        <TabContext value={tab}>
          <TabList onChange={handleTabChange}>
            <Tab label={t('pages.trip.all')} value="all" />
            <Tab label={t('pages.trip.directions')} value="directions" />
          </TabList>
          {trips?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={trips}
              filterSelect={advancedTrips ? advancedTripsPageFilterOptions : tripsPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <TabPanel value="all">
            {loadingTrips ? (
              <LineLoader />
            ) : (
              <Table
                data={filterTrips}
                columns={advancedTripsColumns(false, handleOpenUpdateTrip, handleOpenDeleteTrip)}
                emptyMessage={t('common.noRecords')}
              />
            )}
          </TabPanel>
          <TabPanel value="directions">
            {loadingDirections ? (
              <LineLoader />
            ) : (
              <Table
                data={filterDirections}
                columns={advancedTripsColumns(true)}
                emptyMessage={t('common.noRecords')}
              />
            )}
          </TabPanel>
          {createTrip && (
            <Popup
              content={<CreateTrip onClose={handleCloseTrip} />}
              open={createTrip}
              onClose={handleCloseTrip}
              title={t('pages.trip.addTrip')}
              maxWidthStyle={200}
            />
          )}
          {!!updateTrip && (
            <Popup
              content={<UpdateTrip trip={updateTrip} onClose={handleCloseTrip} />}
              open={!!updateTrip}
              onClose={handleCloseTrip}
              title={`${t('pages.trip.trip')} ${updateTrip?.departure?.city[i18n.language]} - ${updateTrip?.arrival?.city[i18n.language]} (№${updateTrip?.trip_number_id})`}
              maxWidthStyle={220}
            />
          )}
          <DeleteModal
            open={deleteTripData.show}
            onClose={handleClearDeleteTrip}
            handleDelete={handleDelete}
          />
        </TabContext>
      ) : loadingTrips ? (
        <LineLoader />
      ) : (
        <>
          {trips?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={trips}
              filterSelect={tripsPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table data={filterTrips} columns={tripsColumns()} emptyMessage={t('common.noRecords')} />
        </>
      )}
    </div>
  )
}

export default Trips
