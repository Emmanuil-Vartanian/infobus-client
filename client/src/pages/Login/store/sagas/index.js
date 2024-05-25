import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { checkAuthAPI } from '../api'
import { AuthActionTypes } from '../types'
import { logOutUser, setCurrentUser } from '../actions'
import { getCurrentUserTokenSelector } from '../reducers/selectors'
import {
  clearEffectLoading,
  // profileLanguage,
  setEffectLoading,
  setResetAppStore
} from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'

// export function* doLoginSaga(action) {
//   const { params, analyticEvents } = action.payload

//   const dataForLogin = {
//     email: params.email,
//     password: params.password
//   }
//   try {
//     yield put(setEffectLoading(EFFECT_LOADING.LOGIN_PAGE))

//     const result = yield call(doLoginAPI, dataForLogin)

//     if (result.status === 200) {
//       analyticEvents.registrationOrAuthorization.trackAuthorization()
//       yield put(setUserAuthenticated(result.data))
//       yield put(checkAuth())
//       yield put(rememberMe(params.rememberMe || false))
//       yield put(push(ROUTES.MY_OBJECTS_PAGE))
//       yield put(clearEffectLoading(EFFECT_LOADING.LOGIN_PAGE))
//     }
//   } catch (error) {
//     const { response } = error
//     console.error(AuthActionTypes.START_AUTH, response)
//     yield put(clearEffectLoading(EFFECT_LOADING.LOGIN_PAGE))
//     if (response.status === 404 || response.status === 401) {
//       yield put(unauthorizedUserId(true))
//     }
//   }
// }

export function* checkAuthSaga() {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.CHECK_AUTH))
    const jwtToken = yield select(getCurrentUserTokenSelector)

    const { data, status } = yield call(checkAuthAPI, jwtToken)

    if (status === 200) {
      console.log('data', data)
      // yield put(profileLanguage(data.language.name))
      yield put(setCurrentUser({ ...data }))
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
    // takeLatest(AuthActionTypes.START_AUTH, doLoginSaga),
    takeLatest(AuthActionTypes.CHECK_AUTH, checkAuthSaga)
  ])
}
