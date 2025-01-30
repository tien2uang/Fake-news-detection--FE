"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "../types/auth"
import type { PreviousRequest } from "../types/request"
import { fetchPreviousRequests } from "../utils/api"

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  token: string | null
  setToken: (token: string | null) => void
  previousRequests: PreviousRequest[]
  setPreviousRequests: (requests: PreviousRequest[]) => void
  loadPreviousRequests: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [previousRequests, setPreviousRequests] = useState<PreviousRequest[]>([])

  // Load user and token from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("access_token")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  // Update localStorage when user or token changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token)
    } else {
      localStorage.removeItem("access_token")
    }
  }, [token])

  const loadPreviousRequests = async () => {
    if (user && token) {
      try {
        const requests = await fetchPreviousRequests(token)
        setPreviousRequests(requests)
      } catch (error) {
        console.error("Failed to load previous requests:", error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        previousRequests,
        setPreviousRequests,
        loadPreviousRequests,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

