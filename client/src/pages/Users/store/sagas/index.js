import { all, call, put, takeLatest } from 'redux-saga/effects'
import { UsersActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { setConsolidatorsToStore, setUsersToStore } from '../actions'
import { getConsolidatorsAPI, getUsersAPI } from '../api'

export function* getUsersSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_USERS))

    const result = yield call(getUsersAPI)

    if (result.status === 200) {
      yield put(setUsersToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_USERS))
    }
  } catch (error) {
    const { response } = error
    console.error(UsersActionTypes.GET_USERS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_USERS))
  }
}

export function* getConsolidatorsSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_CONSOLIDATORS))

    const result = yield call(getConsolidatorsAPI)

    if (result.status === 200) {
      yield put(setConsolidatorsToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_CONSOLIDATORS))
    }
  } catch (error) {
    const { response } = error
    console.error(UsersActionTypes.GET_CONSOLIDATORS, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_CONSOLIDATORS))
  }
}

export default function* root() {
  yield all([
    takeLatest(UsersActionTypes.GET_USERS, getUsersSaga),
    takeLatest(UsersActionTypes.GET_CONSOLIDATORS, getConsolidatorsSaga)
  ])
}
