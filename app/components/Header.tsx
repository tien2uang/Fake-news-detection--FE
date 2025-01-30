"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import UserMenu from "./UserMenu"

export default function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/signin" || pathname === "/signup"

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Fake News Detector
          </Link>
          {!isAuthPage && (
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-gray-600 hover:text-gray-800">
                    Feedback
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <UserMenu />
      </div>
    </header>
  )
}

