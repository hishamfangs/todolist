import { serverUrl } from "../../utils/global"

// Login
export async function fetchLogin(
  username: string,
  password: string,
): Promise<string> {
  const response = await fetch(`${serverUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}

// LogOut
export async function fetchLogout(username: string): Promise<string> {
  const response = await fetch(`${serverUrl}/logout`, {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}
