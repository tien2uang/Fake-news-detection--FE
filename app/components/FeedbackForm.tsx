"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "../context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function FeedbackForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user,token } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')

    try {
      // Submit feedback
      console.log("Feedback submitted:", formData)
      // Here you would typically send the feedback to your backend

      // Post telemetry
      const telemetryResponse = await fetch(`${API_URL}/model/api/telemetry`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user?.username || "anonymous",
          telemetry_content: formData.content
        }),
      })

      if (!telemetryResponse.ok) {
        throw new Error('Failed to submit telemetry')
      }

      // Reset form and show success message
      setFormData({ name: "", content: "" })
      setSubmitStatus('success')
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setSubmitStatus('error')
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSubmitStatus('idle')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Feedback</Label>
          <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={5} />
        </div>
        <Button type="submit" className="w-full" disabled={submitStatus === 'loading'}>
          {submitStatus === 'loading' ? 'Sending...' : 'Send Feedback'}
        </Button>
        {submitStatus === 'error' && (
          <p className="text-red-600">An error occurred. Please try again.</p>
        )}
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              We appreciate your feedback. It helps us improve our service.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
