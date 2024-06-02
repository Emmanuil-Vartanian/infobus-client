import { all, call, put, takeLatest } from 'redux-saga/effects'
import { checkAuthAPI, signInAPI } from '../api'
import { AuthActionTypes } from '../types'
import { logOutUser, setCurrentUserToStore } from '../actions'
import {
  clearEffectLoading,
  setEffectLoading,
  setResetAppStore
} from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { push } from 'redux-first-history'
import { ROUTES } from 'constants/routes'

export function* signInSaga(action) {
  const { data, errorMessage } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.LOGIN_PAGE))

    const result = yield call(signInAPI, data)

    if (result.status === 200) {
      yield put(setCurrentUserToStore(result.data))
      yield put(push(ROUTES.BOOKINGS_PAGE))
      yield put(clearEffectLoading(EFFECT_LOADING.LOGIN_PAGE))
    }
  } catch (error) {
    const { response } = error
    console.error(AuthActionTypes.SIGN_IN, response)
    errorMessage(response?.statusText)
    yield put(clearEffectLoading(EFFECT_LOADING.LOGIN_PAGE))
  }
}

export function* checkAuthSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.CHECK_AUTH))

    const { data, status } = yield call(checkAuthAPI)

    if (status === 200) {
      yield put(setCurrentUserToStore({ ...data }))
      yield put(clearEffectLoading(EFFECT_LOADING.CHECK_AUTH))
    }
  } catch (error) {
    const { response } = error
    yield put(logOutUser())
    yield put(setResetAppStore())
    yield put(clearEffectLoading(EFFECT_LOADING.CHECK_AUTH))
    // TODO: set error response to redux
    console.error(AuthActionTypes.CHECK_AUTH, response)
  }
}

export default function* root() {
  yield all([
    takeLatest(AuthActionTypes.SIGN_IN, signInSaga),
    takeLatest(AuthActionTypes.CHECK_AUTH, checkAuthSaga)
  ])
}
