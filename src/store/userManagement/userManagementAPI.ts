import { apiURL } from '../../utils/global'
import { handleApiResponse } from '../../utils/apiResponse'

interface LoginResponse {
  username: string
  token: string
}

// Login
export async function fetchLogin(username: string, password: string): Promise<LoginResponse> {
  console.log('fetchLogin called with username:', username)
  const response = await fetch(`${apiURL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('Fetch response status:', response.status)
  const result = await handleApiResponse<LoginResponse>(response)
  console.log('handleApiResponse result:', result)
  return result
}

// LogOut
export async function fetchLogout(username: string): Promise<string> {
  const response = await fetch(`${apiURL}/logout`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleApiResponse<string>(response)
}
