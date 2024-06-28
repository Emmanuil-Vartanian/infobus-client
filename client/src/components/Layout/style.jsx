import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'

const drawerWidth = 200

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: '57px',
  '@media (max-width: 750px)': {
    width: '0px'
  }
})

export const MainBlock = styled('div')(({ open }) => ({
  backgroundColor: '#eff1f4',
  height: 'calc(100vh - 48px)',
  width: open ? 'calc(100% - 200px)' : 'calc(100% - 57px)',
  marginTop: '48px',
  padding: '32px 40px',
  overflow: 'auto',
  '@media (max-width: 750px)': {
    width: '100%',
    padding: '32px 16px'
  }
}))

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  boxShadow: 'none',
  backgroundColor: '#63060a',
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '.MuiPaper-root': {
      marginTop: '48px'
    },
    '.MuiListItemButton-root': {
      paddingLeft: '16px',
      paddingRight: '16px',
      '.MuiListItemIcon-root': {
        marginRight: open ? '10px' : '0px'
      }
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),
    '@media (max-width: 750px)': {
      position: 'absolute'
    }
  })
)
