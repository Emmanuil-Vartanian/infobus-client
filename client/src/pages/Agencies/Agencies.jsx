import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { TitleBlock } from 'pages/Locations/style'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { deleteAgency, getAgencies } from './store/actions'
import LineLoader from 'components/LineLoader'
import Table from 'components/Table'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getAgenciesSelector } from './store/reducers/selectors'
import { agenciesColumns, agenciesCommissionColumns } from 'components/Table/columns/agencies'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import Filter from 'components/Table/components/Filter'
import { agenciesPageFilterOptions } from 'services/filtersOptionsForTables'
import Button from 'components/Button'
import Popup from 'components/Popup'
import AgencyForm from './components/AgencyForm'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { getCarriers } from 'pages/Carriers/store/actions'
import { getCarriersSelector } from 'pages/Carriers/store/reducers/selectors'
import DeleteModal from 'components/Popup/components'

const Agencies = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const agencies = useSelector(getAgenciesSelector)
  const carriers = useSelector(getCarriersSelector)
  const agenciesLoading = useLoadingEffect(EFFECT_LOADING.GET_AGENCIES)
  const carriersLoading = useLoadingEffect(EFFECT_LOADING.GET_CARRIERS)
  const [showPassword, setShowPassword] = useState(false)
  const [dataFilter, setDataFilter] = useState(null)
  const [agencyData, setAgencyData] = useState({ show: false, data: null })
  const [deleteAgencyData, setDeleteAgencyData] = useState({ show: false, data: null })
  const [tab, setTab] = useState('active')

  const filterObjects = filteredObjects(agencies, dataFilter)

  useEffect(() => {
    if (tab === 'commission' && !carriers.length) {
      dispatch(getCarriers())
    }
    if (tab === 'active' && !agencies.length) {
      dispatch(getAgencies())
    }
  }, [tab])

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleEditAgency = data => {
    setAgencyData({ show: true, data })
  }

  const handleClearAgencyData = () => {
    setAgencyData({ show: false, data: null })
  }

  const handleAddAgency = () => {
    setAgencyData({ show: true, data: null })
  }

  const handleDeleteAgency = data => {
    setDeleteAgencyData({ show: true, data })
  }

  const handleClearDeleteAgency = () => {
    setDeleteAgencyData({ show: false, data: null })
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleDelete = () => {
    dispatch(deleteAgency(deleteAgencyData.data, handleClearDeleteAgency))
  }

  return (
    <div>
      <TitleBlock>
        <h1>{t('sideBar.agencies')}</h1>
        <Button size={'small'} variant="outlined" onClick={handleAddAgency}>
          {t('common.add')}
        </Button>
      </TitleBlock>
      <TabContext value={tab}>
        <TabList onChange={handleTabChange}>
          <Tab label={t('pages.agencies.activeTab')} value="active" />
          <Tab label={t('pages.agencies.commissionTab')} value="commission" />
        </TabList>

        {agenciesLoading || carriersLoading ? (
          <LineLoader />
        ) : (
          <>
            {agencies?.length || carriers?.length ? (
              <Filter
                dataFilter={dataFilter}
                defaultData={agencies}
                filterSelect={agenciesPageFilterOptions}
                setDataFilter={setDataFilter}
              />
            ) : null}
            <TabPanel value="active">
              <Table
                data={filterObjects}
                columns={agenciesColumns(
                  showPassword,
                  handleShowPassword,
                  handleEditAgency,
                  handleDeleteAgency
                )}
                emptyMessage={t('common.noRecords')}
              />
            </TabPanel>
            <TabPanel value="commission">
              <Table
                data={filterObjects}
                columns={agenciesCommissionColumns(carriers)}
                emptyMessage={t('common.noRecords')}
              />
            </TabPanel>
          </>
        )}
      </TabContext>
      <Popup
        content={<AgencyForm agency={agencyData.data} closeModal={handleClearAgencyData} />}
        open={agencyData.show}
        onClose={handleClearAgencyData}
        title={agencyData.data ? t('common.edit') : t('common.add')}
        maxWidthStyle={200}
      />
      <DeleteModal
        open={deleteAgencyData.show}
        onClose={handleClearDeleteAgency}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Agencies
