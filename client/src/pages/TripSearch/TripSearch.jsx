import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'

import AuthHeader from 'components/AuthHeader'
import { ColumnsGrid } from 'components/FormFields/style'
import CircularProgress from 'components/CircularProgress'
import Button from 'components/Button'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import SearchBySelectField from 'components/FormFields/SearchBySelectField'
import { AuthBackground } from 'pages/Login/style'
import useCities from 'containers/Dictionaries/Locations/hooks/useCities'
import { getTripSearchCitiesOptions } from 'services/formOptions'
import { tripSearch, tripSearchForReverse } from './store/actions'
import { getTripsSelector } from './store/reducers/selectors'
import LineLoader from 'components/LineLoader'
import { TripsTableBlock } from './style'
import Table from 'components/Table'
import { tripsColumns } from 'components/Table/columns/trips'
import FullInfo from './components/FullInfo'
import Popup from 'components/Popup'
import Reservation from './components/Reservation'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'

const TripSearch = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [cities] = useCities()
  const searchLoading = useLoadingEffect(EFFECT_LOADING.TRIP_SEARCH)
  const citiesLoading = useLoadingEffect(EFFECT_LOADING.GET_CITIES)
  const trips = useSelector(getTripsSelector)
  const token = useSelector(getCurrentUserTokenSelector)
  const [reservation, setReservation] = useState(null)

  const citiesOptions = getTripSearchCitiesOptions(cities)

  const handleSubmit = data => {
    dispatch(tripSearch(data))
  }

  const handleGetTicket = (data, price) => {
    setReservation({ ...data, price })
  }

  const handleGetReverseTicket = (data, price) => {
    setReservation({ ...data, price })
    dispatch(tripSearchForReverse(data, setReservation))
  }

  const handleResetTicket = () => {
    setReservation(null)
  }

  return (
    <>
      {token ? <h1>{t('sideBar.searchFlights')}</h1> : <AuthHeader />}
      <AuthBackground token={token}>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {citiesLoading ? (
                <LineLoader />
              ) : (
                <ColumnsGrid
                  columns={window.innerWidth > 500 ? 3 : window.innerWidth > 400 ? 2 : 1}
                >
                  <SearchBySelectField
                    name={'departure'}
                    label={t('pages.tripSearch.departure')}
                    options={citiesOptions}
                    required
                    removeAsterisk
                  />
                  <SearchBySelectField
                    name={'arrival'}
                    label={t('pages.tripSearch.arrival')}
                    options={citiesOptions}
                    required
                    removeAsterisk
                  />
                  {searchLoading ? (
                    <CircularProgress size={44} />
                  ) : (
                    <Button variant="contained" color="primary" type="submit" id="submit">
                      {t('pages.tripSearch.search')}
                    </Button>
                  )}
                </ColumnsGrid>
              )}
            </form>
          )}
        />
        {trips ? (
          <TripsTableBlock>
            <div>{t('pages.tripSearch.foundTrips').replace(':number', trips.length)}</div>
            {trips.length ? (
              <Table
                data={trips}
                columns={tripsColumns(handleGetTicket, handleGetReverseTicket)}
                sortColumn={false}
                canExpand={() => true}
                renderSubComponent={data => <FullInfo fullinfoData={data} />}
              />
            ) : null}
          </TripsTableBlock>
        ) : null}
        {reservation && (
          <Popup
            content={<Reservation ticket={reservation} closeModal={handleResetTicket} />}
            open={!!reservation}
            onClose={handleResetTicket}
            title={t('pages.tripSearch.toBook')}
            maxWidthStyle={300}
          />
        )}
      </AuthBackground>
    </>
  )
}

export default TripSearch
