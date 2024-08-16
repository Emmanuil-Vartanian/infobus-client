import i18n from 'i18n/config'
import { jwtDecode } from 'jwt-decode'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import IconCell from '../cells/IconCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const idColumn = () => ({
  accessorKey: 'user_number_id',
  header: i18n.t('pages.users.id'),
  meta: {
    widthCell: 20
  }
})

const roleColumn = () => ({
  accessorKey: 'role',
  header: i18n.t('pages.users.role'),
  meta: {
    widthCell: 120
  },
  cell: ({ getValue }) => i18n.t(`roles.${getValue()}`)
})

const nameColumn = () => ({
  accessorKey: 'name',
  header: i18n.t('pages.users.name'),
  meta: {
    widthCell: 160
  }
})

const userColumn = showPassword => ({
  accessorKey: 'user',
  header: i18n.t('pages.users.user'),
  meta: {
    widthCell: 220
  },
  cell: ({ row: { original } }) => {
    const token = original.user_c
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
  header: i18n.t('pages.users.password'),
  meta: {
    widthCell: 220
  },
  cell: ({ row: { original } }) => {
    const token = original.user_c
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

const carrierOrAgentColumn = () => ({
  accessorKey: 'carrier_name',
  header: i18n.t('pages.users.carrierOrAgent'),
  meta: {
    widthCell: 230
  },
  cell: ({ getValue, row: { original } }) => {
    if (getValue()) {
      return getValue()
    } else if (original?.agency_name) {
      return original.agency_name
    } else {
      return '-'
    }
  }
})

const groupColumn = () => ({
  accessorKey: 'consolidator_name',
  header: i18n.t('pages.users.group'),
  meta: {
    widthCell: 140
  },
  cell: ({ getValue }) => getValue() || '-'
})

const accessColumn = () => ({
  accessorKey: 'active',
  header: i18n.t('pages.users.access'),
  meta: {
    widthCell: 110
  },
  cell: ({ getValue }) => (
    <div style={{ color: getValue() ? 'green' : 'red' }}>
      {i18n.t(`common.${getValue() ? 'active' : 'notActive'}`)}
    </div>
  )
})

export const iconsColumn = (editUser, deleteUser) => ({
  accessorKey: ' ',
  meta: {
    widthCell: 105,
    showColumn: () => true,
    icons: () => [
      {
        icon: <EditIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: editUser
      },
      {
        icon: <DeleteIcon sx={{ color: '#63060a', width: '20px', height: '20px' }} />,
        onClick: deleteUser
      }
    ]
  },
  cell: IconCell
})

export const usersColumns = (showPassword, handleShowPassword, editUser, deleteUser) => [
  idColumn(),
  roleColumn(),
  nameColumn(),
  userColumn(showPassword),
  passwordColumn(showPassword, handleShowPassword),
  carrierOrAgentColumn(),
  groupColumn(),
  accessColumn(),
  iconsColumn(editUser, deleteUser)
]
