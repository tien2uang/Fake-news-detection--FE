"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
export default function AnalysisForm() {
  const { user, token } = useAuth()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter()
  const [formData, setFormData] = useState({
    label: "",
    statement: "",
    subject: "",
    speaker: "",
    speaker_job_title: "",
    state_info: "",
    party_affiliation: "",
    barely_true_counts: "",
    false_counts: "",
    half_true_counts: "",
    mostly_true_counts: "",
    pants_on_fire_counts: "",
    context: "",
  })
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/signin")
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/inference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit analysis")
      }

      const result = await response.json()
      setAnalysisResult(result)
      setIsDialogOpen(true)
      // Here you can handle the result, e.g., display it to the user or update some state
    } catch (error) {
      console.error("Error submitting analysis:", error)
      setError("Error submitting analysis. Please try again later.")
      // Here you can handle the error, e.g., display an error message to the user
    }
  }

  return (
    <>
      {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit for Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" name="label" value={formData.label} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="statement">Statement</Label>
            <Textarea id="statement" name="statement" value={formData.statement} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="speaker">Speaker</Label>
            <Input id="speaker" name="speaker" value={formData.speaker} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="speaker_job_title">Speaker Job Title</Label>
            <Input
              id="speaker_job_title"
              name="speaker_job_title"
              value={formData.speaker_job_title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state_info">State Info</Label>
            <Input id="state_info" name="state_info" value={formData.state_info} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="party_affiliation">Party Affiliation</Label>
            <Input
              id="party_affiliation"
              name="party_affiliation"
              value={formData.party_affiliation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="barely_true_counts">Barely True Counts</Label>
            <Input
              id="barely_true_counts"
              name="barely_true_counts"
              type="number"
              value={formData.barely_true_counts}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="false_counts">False Counts</Label>
            <Input
              id="false_counts"
              name="false_counts"
              type="number"
              value={formData.false_counts}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="half_true_counts">Half True Counts</Label>
            <Input
              id="half_true_counts"
              name="half_true_counts"
              type="number"
              value={formData.half_true_counts}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mostly_true_counts">Mostly True Counts</Label>
            <Input
              id="mostly_true_counts"
              name="mostly_true_counts"
              type="number"
              value={formData.mostly_true_counts}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pants_on_fire_counts">Pants on Fire Counts</Label>
            <Input
              id="pants_on_fire_counts"
              name="pants_on_fire_counts"
              type="number"
              value={formData.pants_on_fire_counts}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="context">Context</Label>
          <Textarea id="context" name="context" value={formData.context} onChange={handleChange} required />
        </div>
        <Button type="submit" className="w-full">
          Analyze
        </Button>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Analysis Result</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {analysisResult && <pre className="whitespace-pre-wrap">{JSON.stringify(analysisResult, null, 2)}</pre>}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

