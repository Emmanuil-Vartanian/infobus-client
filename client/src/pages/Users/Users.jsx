import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { filteredObjects } from 'components/Table/components/Filter/filterData'
import LineLoader from 'components/LineLoader'
import Filter from 'components/Table/components/Filter'
import Table from 'components/Table'
import { deleteUser, getUsers } from './store/actions'
import { getUsersSelector } from './store/reducers/selectors'
import { usersColumns } from 'components/Table/columns/users'
import DeleteModal from 'components/Popup/components'
import Popup from 'components/Popup'
import UserForm from './components/UserForm'
import { usersPageFilterOptions } from 'services/filtersOptionsForTables'

const Users = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const users = useSelector(getUsersSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_USERS)
  const [dataFilter, setDataFilter] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({ show: false, data: null })
  const [deleteUserData, setDeleteUserData] = useState({ show: false, data: null })

  const filterObjects = filteredObjects(users, dataFilter)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleEditUser = data => {
    setUserData({ show: true, data })
  }

  const handleClearUserData = () => {
    setUserData({ show: false, data: null })
  }

  const handleDeleteUser = data => {
    setDeleteUserData({ show: true, data })
  }

  const handleClearDeleteUser = () => {
    setDeleteUserData({ show: false, data: null })
  }

  const handleDelete = () => {
    dispatch(deleteUser(deleteUserData.data, handleClearDeleteUser))
  }

  return (
    <div>
      <h1>{t('sideBar.users')}</h1>
      {loading ? (
        <LineLoader />
      ) : (
        <>
          {users?.length ? (
            <Filter
              dataFilter={dataFilter}
              defaultData={users}
              filterSelect={usersPageFilterOptions}
              setDataFilter={setDataFilter}
            />
          ) : null}
          <Table
            data={filterObjects}
            columns={usersColumns(
              showPassword,
              handleShowPassword,
              handleEditUser,
              handleDeleteUser
            )}
            emptyMessage={t('common.noRecords')}
          />
        </>
      )}
      <Popup
        content={<UserForm user={userData.data} onClose={handleClearUserData} />}
        open={userData.show}
        onClose={handleClearUserData}
        title={userData.data ? t('common.edit') : t('common.add')}
        maxWidthStyle={200}
      />
      <DeleteModal
        open={deleteUserData.show}
        onClose={handleClearDeleteUser}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Users
