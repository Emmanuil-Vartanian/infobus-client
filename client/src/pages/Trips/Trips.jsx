import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import LineLoader from 'components/LineLoader'
import Table from 'components/Table'
import { tripsColumns } from 'components/Table/columns/trips'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getTrips } from './store/actions'
import { getTripsSelector } from './store/reducers/selectors'
import Filter from 'components/Table/components/Filter'
import { tripsPageFilterOptions } from 'services/filtersOptionsForTables'
import { filteredObjects } from 'components/Table/components/Filter/filterData'

const Trips = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const trips = useSelector(getTripsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_TRIPS)
  const [dataFilter, setDataFilter] = useState(null)

  const filterObjects = filteredObjects(trips, dataFilter)

  useEffect(() => {
    dispatch(getTrips())
  }, [])

  return (
    <div>
      <h1>{t('sideBar.trips')}</h1>
      {loading ? (
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
          <Table
            data={filterObjects}
            columns={tripsColumns()}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
    </div>
  )
}

export default Trips
