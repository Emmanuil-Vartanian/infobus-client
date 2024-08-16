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
import { getDiscountsSelector } from './store/reducers/selectors'
import { deleteDiscount, getDiscounts } from './store/actions'
import Button from 'components/Button'
import Popup from 'components/Popup'
import DeleteModal from 'components/Popup/components'
import { discountsPageFilterOptions } from 'services/filtersOptionsForTables'
import { discountsColumns } from 'components/Table/columns/discounts'
import DiscountForm from './components/DiscountForm'

const Discounts = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const discounts = useSelector(getDiscountsSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_DISCOUNTS)
  const [dataFilter, setDataFilter] = useState(null)
  const [discountData, setDiscountData] = useState({ show: false, data: null })
  const [deleteData, setDeleteData] = useState({ show: false, data: null })

  const filterObjects = filteredObjects(discounts, dataFilter)

  useEffect(() => {
    dispatch(getDiscounts())
  }, [])

  const handleCloseDiscount = () => {
    setDiscountData({ show: false, data: null })
  }

  const handleEditDiscount = data => {
    setDiscountData({ show: true, data })
  }

  const handleOpenAddDiscount = () => {
    setDiscountData({ show: true, data: null })
  }

  const handleOpenDeleteDiscount = data => {
    setDeleteData({ show: true, data })
  }

  const handleClearDelete = () => {
    setDeleteData({ show: false, data: null })
  }

  const handleDelete = () => {
    dispatch(deleteDiscount(deleteData.data, handleClearDelete))
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.discounts')}</h1>
        <Button size={'small'} variant="outlined" onClick={handleOpenAddDiscount}>
          {t('common.add')}
        </Button>
      </TitleBlock>
      {loading ? (
        <LineLoader />
      ) : (
        <>
          {discounts?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={discounts}
              filterSelect={discountsPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table
            data={filterObjects}
            columns={discountsColumns(handleEditDiscount, handleOpenDeleteDiscount)}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
      <Popup
        content={<DiscountForm discount={discountData.data} closeModal={handleCloseDiscount} />}
        open={discountData.show}
        onClose={handleCloseDiscount}
        title={
          discountData.data ? t('pages.discounts.editDiscount') : t('pages.discounts.addDiscount')
        }
        maxWidthStyle={150}
      />
      <DeleteModal open={deleteData.show} onClose={handleClearDelete} handleDelete={handleDelete} />
    </div>
  )
}

export default Discounts
