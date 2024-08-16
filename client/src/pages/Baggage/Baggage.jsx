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
import { getBaggageSelector } from './store/reducers/selectors'
import { deleteBaggage, getBaggage } from './store/actions'
import Button from 'components/Button'
import Popup from 'components/Popup'
import DeleteModal from 'components/Popup/components'
import { baggagePageFilterOptions } from 'services/filtersOptionsForTables'
import { baggageColumns } from 'components/Table/columns/baggage'
import BaggageForm from './components/BaggageForm/BaggageForm'

const Baggage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const baggage = useSelector(getBaggageSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_BAGGAGE)
  const [dataFilter, setDataFilter] = useState(null)
  const [baggageData, setBaggageData] = useState({ show: false, data: null })
  const [deleteData, setDeleteData] = useState({ show: false, data: null })

  const filterObjects = filteredObjects(baggage, dataFilter)

  useEffect(() => {
    dispatch(getBaggage())
  }, [])

  const handleCloseBaggage = () => {
    setBaggageData({ show: false, data: null })
  }

  const handleEditBaggage = data => {
    setBaggageData({ show: true, data })
  }

  const handleOpenAddBaggage = () => {
    setBaggageData({ show: true, data: null })
  }

  const handleOpenDeleteBaggage = data => {
    setDeleteData({ show: true, data })
  }

  const handleClearDelete = () => {
    setDeleteData({ show: false, data: null })
  }

  const handleDelete = () => {
    dispatch(deleteBaggage(deleteData.data, handleClearDelete))
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.baggage')}</h1>
        <Button size={'small'} variant="outlined" onClick={handleOpenAddBaggage}>
          {t('common.add')}
        </Button>
      </TitleBlock>
      {loading ? (
        <LineLoader />
      ) : (
        <>
          {baggage?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={baggage}
              filterSelect={baggagePageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table
            data={filterObjects}
            columns={baggageColumns(handleEditBaggage, handleOpenDeleteBaggage)}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
      <Popup
        content={<BaggageForm baggage={baggageData.data} closeModal={handleCloseBaggage} />}
        open={baggageData.show}
        onClose={handleCloseBaggage}
        title={baggageData.data ? t('pages.baggage.editBaggage') : t('pages.baggage.addBaggage')}
        maxWidthStyle={200}
      />
      <DeleteModal open={deleteData.show} onClose={handleClearDelete} handleDelete={handleDelete} />
    </div>
  )
}

export default Baggage
