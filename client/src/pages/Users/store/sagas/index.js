import { all, call, put, takeLatest } from 'redux-saga/effects'
import { UsersActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getUsers, setConsolidatorsToStore, setUsersToStore } from '../actions'
import { changeUserAPI, deleteUserAPI, getConsolidatorsAPI, getUsersAPI } from '../api'
import { jwtDecode } from 'jwt-decode'

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

export function* changeUserSaga(action) {
  const { data, closeModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.CHANGE_USER))

    const { pokemonInfo } = jwtDecode(data.user_c)

    const sendData = [
      {
        active: data.active === 'active',
        email: pokemonInfo.login,
        password: data.password || pokemonInfo.password,
        user_id: data._id
      }
    ]

    const result = yield call(changeUserAPI, sendData)

    if (result.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getUsers())
      yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_USER))
    }
  } catch (error) {
    const { response } = error
    console.error(UsersActionTypes.CHANGE_USER, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_USER))
  }
}

export function* deleteUserSaga(action) {
  const { data, closeModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const sendData = {
      active: false
    }

    const result = yield call(deleteUserAPI, data._id, sendData)

    if (result.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getUsers())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(UsersActionTypes.DELETE_USER, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(UsersActionTypes.GET_USERS, getUsersSaga),
    takeLatest(UsersActionTypes.GET_CONSOLIDATORS, getConsolidatorsSaga),
    takeLatest(UsersActionTypes.CHANGE_USER, changeUserSaga),
    takeLatest(UsersActionTypes.DELETE_USER, deleteUserSaga)
  ])
}
