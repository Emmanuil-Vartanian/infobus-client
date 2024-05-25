import { createReducer } from 'typesafe-actions'
import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import {
  clearEffectLoading,
  profileLanguageToStore,
  setEffectLoading,
  setResetAppStore,
  setUsernameToStore,
  sidebarStateToStore
} from '../actions'

export const initialState = {
  loading: {},
  sidebarState: false,
  username: null,
  language: 'UA'
}

const appReducers = createReducer(initialState)
  .handleAction(setEffectLoading, (state, { payload }) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        [payload.name]: true
      }
    }
  })
  .handleAction(clearEffectLoading, (state, { payload }) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        [payload.name]: false
      }
    }
  })
  .handleAction(sidebarStateToStore, state => {
    return {
      ...state,
      sidebarState: !state.sidebarState
    }
  })
  .handleAction(setUsernameToStore, (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  })
  .handleAction(profileLanguageToStore, (state, { payload }) => {
    return {
      ...state,
      language: payload
    }
  })
  .handleAction(setResetAppStore, state => {
    return {
      ...initialState,
      language: state.language
    }
  })

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['language', 'sidebarState', 'username']
}

const appReducer = persistReducer(appPersistConfig, appReducers)

export default appReducer
