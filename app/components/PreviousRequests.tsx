"use client"
import { useEffect,useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../context/AuthContext"
export default function PreviousRequests() {
  const { previousRequests, loadPreviousRequests, user, token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)





  useEffect(() => {
    async function fetchRequests() {
      if (user && token) {
        setIsLoading(true)
        await loadPreviousRequests()
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [user, token])

  if (isLoading) {
    return <div>Loading previous requests...</div>
  }

  if (!user || !token) {
    return <div>Please sign in to view previous requests.</div>
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Previous Requests</h2>
      {previousRequests.length === 0 ? (
        <p>No previous requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <CardTitle>REQUEST #{request.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Statement: {request.statement}</p>
     
                <p className="font-semibold">Speaker:{request.speaker}</p>
   
                <p className="font-semibold">Result:</p>
                <p className={`font-bold ${request.result === "False" ? "text-red-500" : "text-green-500"}`}>
                  {request.result}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

