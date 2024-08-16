import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { TitleBlock } from './style'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import LineLoader from 'components/LineLoader'
import Filter from 'components/Table/components/Filter'
import Table from 'components/Table'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import { getLocationsSelector } from './store/reducers/selectors'
import { deleteLocation, getLocations } from './store/actions'
import { locationsColumns } from 'components/Table/columns/locations'
import { locationsPageFilterOptions } from 'services/filtersOptionsForTables'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'
import { ROLES } from 'constants/roles'
import Button from 'components/Button'
import Popup from 'components/Popup'
import LocationForm from './components/LocationForm'
import DeleteModal from 'components/Popup/components'

const Locations = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locations = useSelector(getLocationsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_LOCATIONS)
  const role = useSelector(getCurrentUserRoleSelector)
  const [dataFilter, setDataFilter] = useState(null)
  const [locationData, setLocationData] = useState({ show: false, data: null })
  const [deleteData, setDeleteData] = useState({ show: false, data: null })

  const filterObjects = filteredObjects(locations, dataFilter)

  const canAdded = role === ROLES.CHIEF

  useEffect(() => {
    dispatch(getLocations())
  }, [])

  const handleEditLocation = data => {
    setLocationData({ show: true, data })
  }

  const handleClearLocationData = () => {
    setLocationData({ show: false, data: null })
  }

  const handleAddLocation = () => {
    setLocationData({ show: true, data: null })
  }

  const handleOpenDeleteLocation = data => {
    setDeleteData({ show: true, data })
  }

  const handleClearDelete = () => {
    setDeleteData({ show: false, data: null })
  }

  const handleDelete = () => {
    dispatch(deleteLocation(deleteData.data, handleClearDelete))
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.locations')}</h1>
        {canAdded && (
          <Button size={'small'} variant="outlined" onClick={handleAddLocation}>
            {t('common.add')}
          </Button>
        )}
      </TitleBlock>
      {loading ? (
        <LineLoader />
      ) : (
        <>
          {locations?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={locations}
              filterSelect={locationsPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table
            data={filterObjects}
            columns={locationsColumns(handleEditLocation, handleOpenDeleteLocation)}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
      <Popup
        content={<LocationForm location={locationData.data} closeModal={handleClearLocationData} />}
        open={locationData.show}
        onClose={handleClearLocationData}
        title={
          locationData.data ? t('pages.locations.editLocation') : t('pages.locations.addLocation')
        }
        maxWidthStyle={200}
      />
      <DeleteModal open={deleteData.show} onClose={handleClearDelete} handleDelete={handleDelete} />
    </div>
  )
}

export default Locations
