"use client"
import { useEffect,useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../context/AuthContext"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function PreviousRequests() {
  const { previousRequests, loadPreviousRequests, user, token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const getResultColor = (result: string) => {
    if (result != null){

      switch (result.toLowerCase()) {
        case "true":
          return "text-green-500"
        case "half-true":
          return "text-yellow-500"
        case "false":
          return "text-red-500"
        default:
          return "text-gray-500"
      }
    }
  }



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
      <h2 className="text-2xl font-bold text-gray-800 sticky top-0 bg-background py-4 z-10">Previous Requests</h2>
      {previousRequests.length === 0 ? (
        <p>No previous requests found.</p>
      ) : (
        <ScrollArea className="h-[600px] rounded-lg border p-4">
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousRequests.map((request) => (
            <Card
            key={request.id}
            className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white rounded-xl overflow-hidden"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono text-gray-600">REQUEST #{request.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Statement:</h3>
                <p className="text-gray-700">{request.statement}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Speaker:</h3>
                <p className="text-gray-700">{request.speaker}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Result:</h3>
                <p className={`font-medium ${getResultColor(request.result)}`}>{request.result}</p>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
        </ScrollArea>
      )}
    </div>
  )
}

