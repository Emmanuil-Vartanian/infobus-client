import { createSelector } from 'reselect'

const loaderFromState = state => state.app.loading
const profileLanguageState = state => state.app.language
const sidebarState = state => state.app.sidebarState
const usernameState = state => state.app.username

export const loaderSelector = createSelector([loaderFromState], loading => loading)

export const profileLanguageSelector = createSelector([profileLanguageState], value => value)

export const sidebarStateSelector = createSelector([sidebarState], value => value)

export const usernameStateSelector = createSelector([usernameState], value => value)
