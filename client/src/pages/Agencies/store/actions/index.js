import { createAction } from 'typesafe-actions'
import { AgenciesActionTypes } from '../types'

const getAgencies = createAction(AgenciesActionTypes.GET_AGENCIES)()

const createAgency = createAction(AgenciesActionTypes.CREATE_AGENCY, (data, closeModal) => ({
  data,
  closeModal
}))()

const changeAgency = createAction(AgenciesActionTypes.CHANGE_AGENCY, (data, closeModal) => ({
  data,
  closeModal
}))()

const deleteAgency = createAction(AgenciesActionTypes.DELETE_AGENCY, (data, closeModal) => ({
  data,
  closeModal
}))()

const setAgenciesToStore = createAction(AgenciesActionTypes.SET_AGENCIES_TO_STORE, data => data)()

export { getAgencies, setAgenciesToStore, createAgency, changeAgency, deleteAgency }
