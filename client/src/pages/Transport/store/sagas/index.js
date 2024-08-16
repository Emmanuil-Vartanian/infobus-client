import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TransportActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getTransportAPI } from '../api'
import { setTransportToStore } from '../actions'

export function* getTransportSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_TRANSPORT))

    const result = yield call(getTransportAPI)

    if (result.status === 200) {
      yield put(setTransportToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_TRANSPORT))
    }
  } catch (error) {
    const { response } = error
    console.error(TransportActionTypes.GET_TRANSPORT, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_TRANSPORT))
  }
}

export default function* root() {
  yield all([takeLatest(TransportActionTypes.GET_TRANSPORT, getTransportSaga)])
}
