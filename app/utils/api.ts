import type { PreviousRequest } from "../types/request"

export async function fetchWithAuth(url: string, token: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    window.location.href = "/signin"
    throw new Error("Unauthorized")
  }

  return response
}

export async function fetchPreviousRequests(token: string): Promise<PreviousRequest[]> {
  const API_URL= process.env.NEXT_PUBLIC_API_URL;
  const response = await fetchWithAuth(`${API_URL}/api/requests/list`, token)
  if (!response.ok) {
    throw new Error("Failed to fetch previous requests")
  }
  return response.json()
}

