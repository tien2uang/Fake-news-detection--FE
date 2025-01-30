"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    // Here you would typically send the feedback to your backend
    // After successful submission, you might want to show a success message and reset the form
    setFormData({ name: "", content: "" })
    alert("Thank you for your feedback!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Feedback</Label>
        <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={5} />
      </div>
      <Button type="submit" className="w-full">
        Send Feedback
      </Button>
    </form>
  )
}

