import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { TitleBlock } from 'pages/Locations/style'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import LineLoader from 'components/LineLoader'
import Filter from 'components/Table/components/Filter'
import Table from 'components/Table'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import { getRoutesSelector } from './store/reducers/selectors'
import { deleteRoute, getRoutes } from './store/actions'
import Button from 'components/Button'
import Popup from 'components/Popup'
import DeleteModal from 'components/Popup/components'
import { routesColumns } from 'components/Table/columns/routes'
import { routesPageFilterOptions } from 'services/filtersOptionsForTables'
import CreateRoute from './components/CreateRoute'

const Routes = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const routes = useSelector(getRoutesSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_ROUTES)
  const [dataFilter, setDataFilter] = useState(null)
  const [addRoute, setAddRoute] = useState(false)
  const [deleteData, setDeleteData] = useState({ show: false, data: null })

  const filterObjects = filteredObjects(routes, dataFilter)

  useEffect(() => {
    dispatch(getRoutes())
  }, [])

  const handleCloseAddRoute = () => {
    setAddRoute(false)
  }

  const handleOpenAddRoute = () => {
    setAddRoute(true)
  }

  const handleOpenDeleteRoute = data => {
    setDeleteData({ show: true, data })
  }

  const handleClearDelete = () => {
    setDeleteData({ show: false, data: null })
  }

  const handleDelete = () => {
    const findRoute = routes.find(route => route.reverse_route_id === deleteData.data._id)
    dispatch(deleteRoute(deleteData.data, handleClearDelete))
    dispatch(deleteRoute(findRoute, handleClearDelete))
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.routes')}</h1>
        <Button size={'small'} variant="outlined" onClick={handleOpenAddRoute}>
          {t('common.add')}
        </Button>
      </TitleBlock>
      {loading ? (
        <LineLoader />
      ) : (
        <>
          {routes?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={routes}
              filterSelect={routesPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table
            data={filterObjects}
            columns={routesColumns(handleOpenDeleteRoute)}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
      <Popup
        content={<CreateRoute closeModal={handleCloseAddRoute} />}
        open={addRoute}
        onClose={handleCloseAddRoute}
        title={t('pages.routes.addRoute')}
        maxWidthStyle={150}
      />
      <DeleteModal open={deleteData.show} onClose={handleClearDelete} handleDelete={handleDelete} />
    </div>
  )
}

export default Routes
