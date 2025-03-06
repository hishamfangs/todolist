import { apiURL } from '../../utils/global'

// Login
export async function fetchLogin(username: string, password: string): Promise<string> {
  return 'F2DL34F2KPHSAPQ34234A25345'

  const response = await fetch(`${apiURL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

// LogOut
export async function fetchLogout(): Promise<string> {
  return ''
  const response = await fetch(`${apiURL}/logout`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
