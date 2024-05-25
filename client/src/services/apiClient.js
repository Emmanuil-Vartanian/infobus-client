import axios from 'axios'
import qs from 'qs'

import persistedStore from '../store'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'
import { logOutUser } from 'pages/Login/store/actions'

export const ApiClient = axios.create({
  baseURL: `${window.location.origin}/`,
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
})

ApiClient.interceptors.request.use(config => {
  const state = persistedStore.store.getState()
  const token = getCurrentUserTokenSelector(state)

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'X-Auth-Token': token || ''
      }
    }
  } else {
    return {
      ...config,
      headers: {
        ...config.headers
      }
    }
  }
})

ApiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    if (response.status === 401) {
      persistedStore.store.dispatch(logOutUser())
    }
    return Promise.reject(error)
  }
)

export const getCancelTokenSource = () => axios.CancelToken.source()
