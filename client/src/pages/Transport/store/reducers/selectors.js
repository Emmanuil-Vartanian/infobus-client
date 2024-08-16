import { createSelector } from 'reselect'

const getTransport = state => state.entities.transport.data

export const getTransportSelector = createSelector([getTransport], value => value)
