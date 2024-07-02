import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { AgenciesActionTypes } from '../types'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getAgencies, setAgenciesToStore } from '../actions'
import { changeAgencyAPI, createAgencyAPI, getAgenciesAPI } from '../api'
import { getConsolidatorsSelector } from 'pages/Users/store/reducers/selectors'

export function* getAgenciesSaga(action) {
  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_AGENCIES))

    const result = yield call(getAgenciesAPI, action.payload)

    if (result.status === 200) {
      yield put(setAgenciesToStore(result.data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_AGENCIES))
    }
  } catch (error) {
    const { response } = error
    console.error(AgenciesActionTypes.GET_AGENCIES, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_AGENCIES))
  }
}

export function* createAgencySaga(action) {
  const { data, closeModal } = action.payload
  try {
    yield put(setEffectLoading(EFFECT_LOADING.CREATE_AGENCY))

    const result = yield call(createAgencyAPI, data)

    if (result.status === 201) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getAgencies())
      yield put(clearEffectLoading(EFFECT_LOADING.CREATE_AGENCY))
    }
  } catch (error) {
    const { response } = error
    console.error(AgenciesActionTypes.CREATE_AGENCY, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CREATE_AGENCY))
  }
}

export function* changeAgencySaga(action) {
  const { data, closeModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.CHANGE_AGENCY))

    const consolidators = yield select(getConsolidatorsSelector)

    const consolidatorName = consolidators.find(item => item._id === data.consolidator_id)

    const dataForSend = {
      ...data,
      consolidator_id: data.consolidator_id || null,
      consolidator_name: consolidatorName ? consolidatorName.name : null
    }

    const result = yield call(changeAgencyAPI, data._id, dataForSend)

    if (result.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getAgencies())
      yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_AGENCY))
    }
  } catch (error) {
    const { response } = error
    console.error(AgenciesActionTypes.CHANGE_AGENCY, response)
    yield put(clearEffectLoading(EFFECT_LOADING.CHANGE_AGENCY))
  }
}

export function* deleteAgencySaga(action) {
  const { data, closeModal } = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.DELETE))

    const dataForSend = {
      ...data,
      active: false
    }

    const result = yield call(changeAgencyAPI, data._id, dataForSend)

    if (result.status === 200) {
      if (typeof closeModal === 'function') {
        closeModal()
      }
      yield put(getAgencies())
      yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
    }
  } catch (error) {
    const { response } = error
    console.error(AgenciesActionTypes.DELETE_AGENCY, response)
    yield put(clearEffectLoading(EFFECT_LOADING.DELETE))
  }
}

export default function* root() {
  yield all([
    takeLatest(AgenciesActionTypes.GET_AGENCIES, getAgenciesSaga),
    takeLatest(AgenciesActionTypes.CREATE_AGENCY, createAgencySaga),
    takeLatest(AgenciesActionTypes.CHANGE_AGENCY, changeAgencySaga),
    takeLatest(AgenciesActionTypes.DELETE_AGENCY, deleteAgencySaga)
  ])
}
