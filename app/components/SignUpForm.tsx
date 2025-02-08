"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    retypePassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.retypePassword) {
      setError("Passwords don't match")
      return
    }

    try {
      const response = await fetch(`${API_URL}/author/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        // Reset form
        setFormData({ username: "", password: "", retypePassword: "" })
        // Redirect to signin page after a short delay
        setTimeout(() => {
          router.push("/signin")
        }, 2000)
      } else {
        setError(data.message || "Failed to register user")
      }
    } catch (error) {
      console.log(error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
      {success && <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">{success}</div>}
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
      <div>
        <Label htmlFor="retypePassword">Retype Password</Label>
        <Input
          id="retypePassword"
          name="retypePassword"
          type="password"
          required
          value={formData.retypePassword}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  )
}

