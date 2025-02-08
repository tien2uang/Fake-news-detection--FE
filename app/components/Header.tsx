"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import UserMenu from "./UserMenu"

export default function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/signin" || pathname === "/signup"
  const linkClass =
    "text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-300 ease-in-out"
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
          >
            Fake News Detector
          </Link>
          {!isAuthPage && (
            <nav>
              <ul className="flex space-x-4">
                <li>
                <Link href="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li>
                <Link href="/about" className={linkClass}>
                    About
                  </Link>
                </li>
                <li>
                <Link href="/feedback" className={linkClass}>
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

