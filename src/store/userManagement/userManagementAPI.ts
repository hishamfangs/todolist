import { apiURL } from '../../utils/global'
import { handleApiResponse } from '../../utils/apiResponse'

interface LoginResponse {
  username: string
  token: string
}

// Login
export async function fetchLogin(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${apiURL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleApiResponse<LoginResponse>(response)
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
