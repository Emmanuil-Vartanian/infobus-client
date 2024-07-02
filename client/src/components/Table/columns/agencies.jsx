import i18n from 'i18n/config'
import IconCell from '../cells/IconCell'
import EditIcon from '@mui/icons-material/Edit'
import { jwtDecode } from 'jwt-decode'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'

const idColumn = () => ({
  accessorKey: 'agency_number_id',
  header: i18n.t('pages.agencies.id'),
  meta: {
    widthCell: 70
  }
})

const nameColumn = () => ({
  accessorKey: 'name',
  header: i18n.t('pages.agencies.name'),
  meta: {
    widthCell: 200
  }
})

const shortNameColumn = () => ({
  accessorKey: 'short_name',
  header: i18n.t('pages.agencies.shortName'),
  meta: {
    widthCell: 200
  }
})

const taxColumn = () => ({
  accessorKey: 'tax',
  header: i18n.t('pages.agencies.taxNumber'),
  meta: {
    widthCell: 200
  }
})

const statusColumn = () => ({
  accessorKey: 'enterprise_status',
  header: i18n.t('pages.agencies.status'),
  meta: {
    widthCell: 140
  },
  cell: ({ getValue }) => i18n.t(`pages.agencies.${getValue()}`)
})

const ownerColumn = () => ({
  accessorKey: 'enterprise_owner',
  header: i18n.t('pages.agencies.owner'),
  meta: {
    widthCell: 160
  }
})

const groupColumn = () => ({
  accessorKey: 'consolidator_name',
  header: i18n.t('pages.agencies.group'),
  meta: {
    widthCell: 150
  },
  cell: ({ getValue }) => getValue() || '-'
})

const postalCodeColumn = () => ({
  accessorKey: 'postal_code',
  header: i18n.t('pages.agencies.postalCode'),
  meta: {
    widthCell: 200
  }
})

const streetColumn = () => ({
  accessorKey: 'street',
  header: i18n.t('pages.agencies.street'),
  meta: {
    widthCell: 150
  }
})

const cityColumn = () => ({
  accessorKey: 'city',
  header: i18n.t('pages.agencies.city'),
  meta: {
    widthCell: 130
  }
})

const telColumn = () => ({
  accessorKey: 'contact_tel',
  header: i18n.t('pages.agencies.tel'),
  meta: {
    widthCell: 130
  }
})

const faxColumn = () => ({
  accessorKey: 'contact_fax',
  header: i18n.t('pages.agencies.fax'),
  meta: {
    widthCell: 130
  }
})

const emailColumn = () => ({
  accessorKey: 'contact_email',
  header: i18n.t('pages.agencies.email'),
  meta: {
    widthCell: 200
  }
})

const userColumn = showPassword => ({
  accessorKey: 'user',
  header: i18n.t('pages.agencies.user'),
  meta: {
    widthCell: 220
  },
  cell: ({ row: { original } }) => {
    const token = original.manager_c
    const decodedToken = jwtDecode(token)
    return (
      <div style={{ width: '180px', textAlign: 'start' }}>
        {showPassword ? decodedToken.pokemonInfo.login : '**********'}
      </div>
    )
  }
})

const passwordColumn = (showPassword, handleShowPassword) => ({
  accessorKey: 'password',
  header: i18n.t('pages.agencies.password'),
  meta: {
    widthCell: 220
  },
  cell: ({ row: { original } }) => {
    const token = original.manager_c
    const decodedToken = jwtDecode(token)

    const iconStyle = {
      width: '14px',
      height: '14px',
      cursor: 'pointer'
    }

    return (
      <div
        style={{
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {showPassword ? decodedToken.pokemonInfo.password : '**********'}
        {showPassword ? (
          <VisibilityOffIcon onClick={handleShowPassword} style={iconStyle} />
        ) : (
          <VisibilityIcon onClick={handleShowPassword} style={iconStyle} />
        )}
      </div>
    )
  }
})

const accessColumn = () => ({
  accessorKey: 'active',
  header: i18n.t('pages.agencies.access'),
  meta: {
    widthCell: 120
  },
  cell: ({ getValue }) => (
    <div style={{ color: getValue() ? 'green' : 'red' }}>
      {i18n.t(`pages.agencies.${getValue() ? 'active' : 'notActive'}`)}
    </div>
  )
})

const commissionColumn = item => ({
  accessorKey: item._id,
  header: item.name,
  meta: {
    widthCell: 120
  },
  cell: ({ row: { original } }) => {
    const commission = original.commission.find(i => i?.carrier_id === item?._id)
    return commission ? commission.value : '-'
  }
})

export const iconsColumn = (editAgency, deleteAgency) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editAgency
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: deleteAgency
      }
    ]
  },
  cell: IconCell
})

export const agenciesColumns = (
  showPassword,
  handleShowPassword,
  handleEditAgency,
  handleDeleteAgency
) => {
  return [
    idColumn(),
    nameColumn(),
    shortNameColumn(),
    taxColumn(),
    statusColumn(),
    ownerColumn(),
    groupColumn(),
    postalCodeColumn(),
    streetColumn(),
    cityColumn(),
    telColumn(),
    faxColumn(),
    emailColumn(),
    userColumn(showPassword),
    passwordColumn(showPassword, handleShowPassword),
    accessColumn(),
    iconsColumn(handleEditAgency, handleDeleteAgency)
  ]
}

export const agenciesCommissionColumns = carriers => {
  const commissions = carriers.map(item => commissionColumn(item)) || []
  return [idColumn(), nameColumn(), ...commissions, groupColumn()]
}
