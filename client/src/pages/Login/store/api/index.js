import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

export const signInAPI = data => {
  return ApiClient.post(URL.LOGIN, data)
}

export const checkAuthAPI = () => ApiClient.get(URL.VALIDATE_TOKEN)
