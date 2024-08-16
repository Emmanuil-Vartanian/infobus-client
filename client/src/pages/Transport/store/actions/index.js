import { createAction } from 'typesafe-actions'
import { TransportActionTypes } from '../types'

const getTransport = createAction(TransportActionTypes.GET_TRANSPORT)()

const setTransportToStore = createAction(
  TransportActionTypes.SET_TRANSPORT_TO_STORE,
  data => data
)()

export { getTransport, setTransportToStore }
