import SignInForm from "../components/SignInForm"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <SignInForm />
      <p className="mt-4 text-center">
        Do not have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

