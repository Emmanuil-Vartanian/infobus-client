import { createSelector } from 'reselect'

const locationsState = state => state.entities.dictionaries.locations.data

export const locationsSelector = createSelector([locationsState], country => country)
