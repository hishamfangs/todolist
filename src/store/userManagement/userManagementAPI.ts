import { apiURL } from '../../utils/global'

// Login
export async function fetchLogin(username: string, password: string): Promise<string> {
  //return 'F2DL34F2KPHSAPQ34234A25345'
  try {
    const response = await fetch(`${apiURL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status == 500 || response.status == 404 || response.status == 401 || response.status == 400) {
      throw new Error('fetchLogin(): ' + response.statusText)
    }
    const resp = await response.json()
    return resp.token
  } catch (e) {
    console.log('fetchLogin(): ' + e)
    throw new Error('fetchLogin(): ' + e)
  }
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
  return response.json()
}
