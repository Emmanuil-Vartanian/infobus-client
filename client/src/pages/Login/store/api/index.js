import { ApiClient } from 'services/apiClient'
import { URL } from 'api'

// export const doLoginAPI = (params): Promise<AxiosResponse> => {
//   const data = new URLSearchParams()
//   data.append('email', params.email)
//   data.append('password', params.password)

//   return ApiClient.post(URL.LOGIN, data, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }

export const checkAuthAPI = data => ApiClient.post(URL.VALIDATE_TOKEN, data)
