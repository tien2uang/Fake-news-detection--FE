"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "../context/AuthContext"
import type { AuthResponse } from "../types/auth"

export default function SignInForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser, setToken } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Replace this with your actual API endpoint
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Sign in failed")
      }

      const data: AuthResponse = await response.json()

      // Store user data and token
      setUser({
        username: data.username,
      })
      setToken(data.access_token)

      // Redirect to home page
      router.push("/")
    } catch (err) {
      console.log(err)
      setError("Failed to sign in. Please check your credentials.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}

