import AnalysisForm from "./components/AnalysisForm"
import PreviousRequests from "./components/PreviousRequests"

export default function Home() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold mb-6">Fake News Detection</h1>
      <AnalysisForm />
      <PreviousRequests />
    </div>
  )
}

