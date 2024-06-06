import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppBar, Drawer, MainBlock } from './style'

import Header from './components/Header'
import SideBar from './components/SideBar'
import { sidebarStateSelector } from 'containers/App/store/reducers/selectors'
import { sidebarStateToStore } from 'containers/App/store/actions'

const MiniDrawer = ({ children }) => {
  const dispatch = useDispatch()
  const sideBarState = useSelector(sidebarStateSelector)

  const handleDrawerOpen = () => {
    dispatch(sidebarStateToStore())
  }

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" open={sideBarState}>
        <Header open={sideBarState} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Drawer variant={'permanent'} open={sideBarState}>
        <SideBar open={sideBarState} />
      </Drawer>
      <MainBlock open={sideBarState}>{children}</MainBlock>
    </div>
  )
}

export default MiniDrawer
