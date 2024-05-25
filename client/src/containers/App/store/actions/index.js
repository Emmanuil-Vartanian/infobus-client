import { createAction } from 'typesafe-actions'

import { ActionTypes } from '../types'

const setEffectLoading = createAction(ActionTypes.SET_EFFECT_LOADING, name => ({
  name
}))()

const clearEffectLoading = createAction(ActionTypes.CLEAR_EFFECT_LOADING, name => ({
  name
}))()

const profileLanguageToStore = createAction(ActionTypes.PROFILE_LANGUAGE, language => language)()

const sidebarStateToStore = createAction(ActionTypes.SIDEBAR_STATE)()

const setUsernameToStore = createAction(ActionTypes.SET_USERNAME_TO_STORE, username => username)()

const setResetAppStore = createAction(ActionTypes.SET_RESET_APP_STORE)()

export {
  setEffectLoading,
  clearEffectLoading,
  profileLanguageToStore,
  sidebarStateToStore,
  setUsernameToStore,
  setResetAppStore
}
