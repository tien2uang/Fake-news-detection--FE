import SignUpForm from "../components/SignUpForm"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <SignUpForm />
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

