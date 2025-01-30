"use client"

import { useRouter, usePathname } from "next/navigation"
import { UserCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../context/AuthContext"

export default function UserMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser, setToken } = useAuth()

  const handleLogout = () => {
    // Clear auth state
    setUser(null)
    setToken(null)
    // Redirect to sign in page
    router.push("/signin")
  }

  // Hide UserMenu on Sign In and Sign Up pages
  if (pathname === "/signin" || pathname === "/signup") {
    return null
  }

  if (!user) {
    return (
      <button onClick={() => router.push("/signin")} className="text-gray-600 hover:text-gray-800">
        Sign In
      </button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-600 hover:text-gray-800">
          <UserCircle size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="font-medium">Username:</span> {user.username}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

